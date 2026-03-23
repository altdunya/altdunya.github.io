const STORAGE_KEY = 'altdunyaSiteData';
let db = null;
let currentId = null;

const gameList = document.getElementById('gameList');
const form = document.getElementById('gameForm');
const formTitle = document.getElementById('formTitle');
const deleteBtn = document.getElementById('deleteBtn');
const searchInput = document.getElementById('gameSearch');
const siteSettingsForm = document.getElementById('siteSettingsForm');
const featuredGameSelect = document.getElementById('featuredGameSelect');
const popularSlots = document.getElementById('popularSlots');

async function init() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    db = JSON.parse(local);
  } else {
    let res;
    try {
      res = await fetch('data/games.json');
      if (!res.ok) throw new Error('data/games.json bulunamadı');
    } catch (err) {
      res = await fetch('games.json');
    }
    db = await res.json();
    persist();
  }
  db.site = db.site || {};
  db.site.popularSlugs = Array.isArray(db.site.popularSlugs) ? db.site.popularSlugs : [];
  renderSiteSettings();
  renderList();
  selectGame(db.games[0]?.id || null);
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function renderSiteSettings() {
  const featuredSlug = db.site?.featuredSlug || db.games[0]?.slug || '';
  featuredGameSelect.innerHTML = db.games.map(game => `
    <option value="${game.slug}" ${game.slug === featuredSlug ? 'selected' : ''}>${game.title}</option>
  `).join('');

  const selectedPopular = Array.isArray(db.site?.popularSlugs) ? db.site.popularSlugs : [];
  const slots = Array.from({ length: 10 }, (_, i) => selectedPopular[i] || '');

  popularSlots.innerHTML = slots.map((slug, i) => `
    <label>Popüler #${i + 1}
      <select data-popular-index="${i}">
        <option value="">— Seçiniz —</option>
        ${db.games.map(game => `<option value="${game.slug}" ${game.slug === slug ? 'selected' : ''}>${game.title}</option>`).join('')}
      </select>
    </label>
  `).join('');
}

function collectSiteSettings() {
  const popularSlugs = [...popularSlots.querySelectorAll('select[data-popular-index]')]
    .map(select => select.value)
    .filter(Boolean)
    .filter((slug, index, arr) => arr.indexOf(slug) === index);

  db.site = {
    ...db.site,
    featuredSlug: featuredGameSelect.value || db.games[0]?.slug || '',
    popularSlugs
  };
}


function renderList(filter = '') {
  const items = db.games.filter(g => g.title.toLowerCase().includes(filter.toLowerCase()));
  gameList.innerHTML = items.length ? items.map(game => `
    <div class="game-list-item ${game.id === currentId ? 'active' : ''}" data-id="${game.id}">
      <strong>${game.title}</strong>
      <div class="muted">${game.category} · ${game.platform || '—'}</div>
    </div>
  `).join('') : '<div class="search-empty">Kayıt bulunamadı.</div>';
  document.querySelectorAll('.game-list-item').forEach(item => item.addEventListener('click', () => selectGame(item.dataset.id)));
}

function emptyGame() {
  return {
    id: crypto.randomUUID(),
    title: '', slug: '', category: 'freeware', segment: '', platform: '', genre: '', year: '', developer: '', publisher: '', metacritic: '', players: '', series: '', heroTitle: '', shortDescription: '', cover: '', videoUrl: '', tags: [], screenshots: [], story: '',
    pack: { version: '', size: '', controls: '', notes: '', steps: [], archiveUrl: '' }
  };
}

function selectGame(id) {
  currentId = id;
  const game = db.games.find(g => g.id === id) || emptyGame();
  formTitle.textContent = game.title ? `Düzenle: ${game.title}` : 'Yeni Oyun';
  deleteBtn.style.visibility = game.title ? 'visible' : 'hidden';
  fillForm(game);
  renderList(searchInput.value);
}

function fillForm(game) {
  const set = (name, value) => form.elements[name].value = value ?? '';
  set('title', game.title); set('slug', game.slug); set('category', game.category); set('segment', game.segment);
  set('platform', game.platform); set('genre', game.genre); set('year', game.year); set('developer', game.developer);
  set('publisher', game.publisher); set('metacritic', game.metacritic); set('players', game.players); set('series', game.series);
  set('heroTitle', game.heroTitle); set('shortDescription', game.shortDescription); set('cover', game.cover); set('videoUrl', game.videoUrl);
  set('tags', (game.tags || []).join(', ')); set('screenshots', (game.screenshots || []).join('\n')); set('story', game.story);
  set('packVersion', game.pack?.version); set('packSize', game.pack?.size); set('packControls', game.pack?.controls); set('packNotes', game.pack?.notes);
  set('packSteps', (game.pack?.steps || []).join('\n')); set('archiveUrl', game.pack?.archiveUrl);
}

function collectForm() {
  return {
    id: currentId || crypto.randomUUID(),
    title: form.elements.title.value.trim(),
    slug: form.elements.slug.value.trim(),
    category: form.elements.category.value,
    segment: form.elements.segment.value.trim(),
    platform: form.elements.platform.value.trim(),
    genre: form.elements.genre.value.trim(),
    year: form.elements.year.value ? Number(form.elements.year.value) : null,
    developer: form.elements.developer.value.trim(),
    publisher: form.elements.publisher.value.trim(),
    metacritic: form.elements.metacritic.value ? Number(form.elements.metacritic.value) : null,
    players: form.elements.players.value.trim(),
    series: form.elements.series.value.trim(),
    heroTitle: form.elements.heroTitle.value.trim(),
    shortDescription: form.elements.shortDescription.value.trim(),
    cover: form.elements.cover.value.trim(),
    videoUrl: form.elements.videoUrl.value.trim() || null,
    tags: form.elements.tags.value.split(',').map(v => v.trim()).filter(Boolean),
    screenshots: form.elements.screenshots.value.split('\n').map(v => v.trim()).filter(Boolean),
    story: form.elements.story.value.trim(),
    pack: {
      version: form.elements.packVersion.value.trim(),
      size: form.elements.packSize.value.trim(),
      controls: form.elements.packControls.value.trim(),
      notes: form.elements.packNotes.value.trim(),
      steps: form.elements.packSteps.value.split('\n').map(v => v.trim()).filter(Boolean),
      archiveUrl: form.elements.archiveUrl.value.trim()
    }
  };
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = collectForm();
  const idx = db.games.findIndex(g => g.id === payload.id);
  if (idx > -1) db.games[idx] = payload;
  else db.games.unshift(payload);
  currentId = payload.id;
  persist();
  renderList(searchInput.value);
  selectGame(currentId);
  alert('Kaydedildi. Site ön yüzde bu kayıt localStorage üzerinden hemen güncellenecek.');
});

siteSettingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  collectSiteSettings();
  persist();
  renderSiteSettings();
  alert('Hero ve popüler oyun ayarları kaydedildi.');
});

document.getElementById('newGameBtn').addEventListener('click', () => {
  currentId = null;
  form.reset();
  formTitle.textContent = 'Yeni Oyun';
  deleteBtn.style.visibility = 'hidden';
  renderList(searchInput.value);
  renderSiteSettings();
});

deleteBtn.addEventListener('click', () => {
  if (!currentId) return;
  const game = db.games.find(g => g.id === currentId);
  if (!game) return;
  if (!confirm(`${game.title} silinsin mi?`)) return;
  db.games = db.games.filter(g => g.id !== currentId);
  persist();
  currentId = db.games[0]?.id || null;
  renderList(searchInput.value);
  if (currentId) selectGame(currentId); else form.reset();
});

searchInput.addEventListener('input', () => renderList(searchInput.value));

document.getElementById('exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'games.json';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById('importInput').addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const text = await file.text();
  db = JSON.parse(text);
  db.site = db.site || {};
  db.site.popularSlugs = Array.isArray(db.site.popularSlugs) ? db.site.popularSlugs : [];
  persist();
  renderSiteSettings();
  renderList();
  selectGame(db.games[0]?.id || null);
  alert('JSON içeri aktarıldı.');
});

init();
