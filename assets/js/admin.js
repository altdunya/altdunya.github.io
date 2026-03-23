const STORAGE_KEY = 'altdunyaSiteData';
let db = null;
let currentId = null;

const gameList = document.getElementById('gameList');
const form = document.getElementById('gameForm');
const formTitle = document.getElementById('formTitle');
const deleteBtn = document.getElementById('deleteBtn');
const searchInput = document.getElementById('gameSearch');
const heroSelect = document.getElementById('heroSelect');
const popularSlots = document.getElementById('popularSlots');
const gameCount = document.getElementById('gameCount');

async function init() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    db = JSON.parse(local);
  } else {
    db = await loadRemoteData();
    persist();
  }
  normalizeDb();
  renderSettings();
  renderList();
  selectGame(db.games[0]?.id || null);
}

async function loadRemoteData() {
  try {
    const res = await fetch('games.json');
    if (res.ok) return await res.json();
  } catch (e) {}
  try {
    const res = await fetch('data/games.json');
    if (res.ok) return await res.json();
  } catch (e) {}
  return { site: { home: {}, categories: [] }, games: [] };
}

function normalizeDb() {
  db.site ||= {};
  db.site.home ||= {};
  db.games ||= [];
  if (!db.site.home.heroSlug) db.site.home.heroSlug = db.games[0]?.slug || '';
  if (!Array.isArray(db.site.home.popularSlugs)) db.site.home.popularSlugs = [];
  db.site.home.popularSlugs = db.site.home.popularSlugs.filter(Boolean).slice(0, 10);
  while (db.site.home.popularSlugs.length < 10) db.site.home.popularSlugs.push('');
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function renderSettings() {
  const options = ['<option value="">— Seçiniz —</option>'] + db.games.map(g => `<option value="${g.slug}">${g.title}</option>`);
  heroSelect.innerHTML = options.join('');
  heroSelect.value = db.site.home.heroSlug || '';

  popularSlots.innerHTML = Array.from({ length: 10 }).map((_, i) => `
    <label>
      <span>Popüler #${i + 1}</span>
      <select data-slot="${i}">
        ${options.join('')}
      </select>
    </label>
  `).join('');

  [...popularSlots.querySelectorAll('select')].forEach((select, i) => {
    select.value = db.site.home.popularSlugs[i] || '';
    select.addEventListener('change', (e) => {
      db.site.home.popularSlugs[i] = e.target.value;
    });
  });
}

function renderList(filter = '') {
  const items = db.games.filter(g => g.title.toLowerCase().includes(filter.toLowerCase()));
  gameCount.textContent = `${items.length} oyun`;
  gameList.innerHTML = items.length ? items.map(game => `
    <button type="button" class="game-list-item ${game.id === currentId ? 'active' : ''}" data-id="${game.id}">
      <strong>${game.title}</strong>
      <div class="muted">${labelize(game.category)} · ${game.platform || '—'}</div>
    </button>
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
  formTitle.textContent = game.title ? game.title : 'Yeni Oyun';
  deleteBtn.style.display = game.title ? 'inline-flex' : 'none';
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

function syncSelectionsAfterGameSave(payload, previousSlug = '') {
  if (db.site.home.heroSlug === previousSlug) db.site.home.heroSlug = payload.slug;
  db.site.home.popularSlugs = db.site.home.popularSlugs.map(slug => slug === previousSlug ? payload.slug : slug);
  if (!db.site.home.heroSlug) db.site.home.heroSlug = payload.slug;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const previous = db.games.find(g => g.id === currentId);
  const previousSlug = previous?.slug || '';
  const payload = collectForm();
  const idx = db.games.findIndex(g => g.id === payload.id);
  if (idx > -1) db.games[idx] = payload;
  else db.games.unshift(payload);
  currentId = payload.id;
  syncSelectionsAfterGameSave(payload, previousSlug);
  persist();
  renderSettings();
  renderList(searchInput.value);
  selectGame(currentId);
  alert('Oyun kaydedildi.');
});

document.getElementById('newGameBtn').addEventListener('click', () => {
  currentId = null;
  form.reset();
  formTitle.textContent = 'Yeni Oyun';
  deleteBtn.style.display = 'none';
  renderList(searchInput.value);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

deleteBtn.addEventListener('click', () => {
  if (!currentId) return;
  const game = db.games.find(g => g.id === currentId);
  if (!game) return;
  if (!confirm(`${game.title} silinsin mi?`)) return;
  db.games = db.games.filter(g => g.id !== currentId);
  if (db.site.home.heroSlug === game.slug) db.site.home.heroSlug = db.games[0]?.slug || '';
  db.site.home.popularSlugs = db.site.home.popularSlugs.map(slug => slug === game.slug ? '' : slug);
  persist();
  currentId = db.games[0]?.id || null;
  renderSettings();
  renderList(searchInput.value);
  if (currentId) selectGame(currentId); else form.reset();
});

searchInput.addEventListener('input', () => renderList(searchInput.value));

heroSelect.addEventListener('change', (e) => {
  db.site.home.heroSlug = e.target.value;
});

document.getElementById('saveSettingsBtn').addEventListener('click', () => {
  persist();
  alert('Site ayarları kaydedildi.');
});

document.getElementById('exportBtn').addEventListener('click', () => {
  persist();
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
  normalizeDb();
  persist();
  renderSettings();
  renderList();
  selectGame(db.games[0]?.id || null);
  alert('JSON içeri aktarıldı.');
});

function labelize(value) {
  return ({ freeware: 'Freeware', arcade: 'Arcade', konsol: 'Konsol', videolar: 'Videolar' })[value] || value;
}

init();
