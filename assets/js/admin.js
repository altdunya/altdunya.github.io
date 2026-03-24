
const STORAGE_KEY = 'altdunyaSiteData';
let db = null;
let currentId = null;

const gameList = document.getElementById('gameList');
const form = document.getElementById('gameForm');
const formTitle = document.getElementById('formTitle');
const deleteBtn = document.getElementById('deleteBtn');
const searchInput = document.getElementById('gameSearch');
const gameCount = document.getElementById('gameCount');

async function loadRemoteData() {
  try {
    const res = await fetch('games.json', { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {}
  try {
    const res = await fetch('data/games.json', { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return { site: { home: { heroSlug: '', popularSlugs: [] }, categories: [] }, games: [] };
}

function normalizeDb() {
  db ||= {};
  db.site ||= {};
  db.site.home ||= {};
  db.site.categories ||= [];
  db.games ||= [];
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function labelize(value) {
  return ({ freeware: 'Freeware', arcade: 'Arcade', konsol: 'Konsol', openbor: 'OpenBOR', videolar: 'Videolar' })[value] || value || '—';
}

function emptyGame() {
  return {
    id: crypto.randomUUID(),
    title: '', slug: '', category: 'freeware', segment: '', platform: '', genre: '', year: '', developer: '', publisher: '', metacritic: '', players: '', series: '', heroTitle: '', shortDescription: '', cover: '', videoUrl: '', tags: [], screenshots: [], story: '',
    pack: { version: '', size: '', controls: '', notes: '', steps: [], archiveUrl: '' }
  };
}

function renderList(filter = '') {
  const items = db.games.filter(g => (g.title || '').toLowerCase().includes(filter.toLowerCase()));
  gameCount.textContent = `${items.length} oyun`;
  gameList.innerHTML = items.length ? items.map(game => `
    <button type="button" class="game-list-item ${game.id === currentId ? 'active' : ''}" data-id="${game.id}">
      <strong>${game.title || 'İsimsiz Oyun'}</strong>
      <div class="muted">${labelize(game.category)} · ${game.platform || '—'}</div>
    </button>
  `).join('') : '<div class="search-empty">Kayıt bulunamadı.</div>';
  gameList.querySelectorAll('.game-list-item').forEach(item => item.addEventListener('click', () => selectGame(item.dataset.id)));
}

function setField(name, value) {
  if (form.elements[name]) form.elements[name].value = value ?? '';
}

function fillForm(game) {
  setField('title', game.title); setField('slug', game.slug); setField('category', game.category); setField('segment', game.segment);
  setField('platform', game.platform); setField('genre', game.genre); setField('year', game.year); setField('developer', game.developer);
  setField('publisher', game.publisher); setField('metacritic', game.metacritic); setField('players', game.players); setField('series', game.series);
  setField('heroTitle', game.heroTitle); setField('shortDescription', game.shortDescription); setField('cover', game.cover); setField('videoUrl', game.videoUrl);
  setField('tags', (game.tags || []).join(', ')); setField('screenshots', (game.screenshots || []).join('\n')); setField('story', game.story);
  setField('packVersion', game.pack?.version); setField('packSize', game.pack?.size); setField('packControls', game.pack?.controls); setField('packNotes', game.pack?.notes);
  setField('packSteps', (game.pack?.steps || []).join('\n')); setField('archiveUrl', game.pack?.archiveUrl);
}

function selectGame(id) {
  currentId = id;
  const game = db.games.find(g => g.id === id) || emptyGame();
  formTitle.textContent = game.title || 'Yeni Oyun';
  deleteBtn.style.display = game.title ? 'inline-flex' : 'none';
  fillForm(game);
  renderList(searchInput.value);
}

function collectForm() {
  const n = form.elements;
  return {
    id: currentId || crypto.randomUUID(),
    title: n.title.value.trim(),
    slug: n.slug.value.trim(),
    category: n.category.value,
    segment: n.segment.value.trim(),
    platform: n.platform.value.trim(),
    genre: n.genre.value.trim(),
    year: n.year.value ? Number(n.year.value) : null,
    developer: n.developer.value.trim(),
    publisher: n.publisher.value.trim(),
    metacritic: n.metacritic.value ? Number(n.metacritic.value) : null,
    players: n.players.value.trim(),
    series: n.series.value.trim(),
    heroTitle: n.heroTitle.value.trim(),
    shortDescription: n.shortDescription.value.trim(),
    cover: n.cover.value.trim(),
    videoUrl: n.videoUrl.value.trim() || null,
    tags: n.tags.value.split(',').map(v => v.trim()).filter(Boolean),
    screenshots: n.screenshots.value.split('\n').map(v => v.trim()).filter(Boolean),
    story: n.story.value.trim(),
    pack: {
      version: n.packVersion.value.trim(),
      size: n.packSize.value.trim(),
      controls: n.packControls.value.trim(),
      notes: n.packNotes.value.trim(),
      steps: n.packSteps.value.split('\n').map(v => v.trim()).filter(Boolean),
      archiveUrl: n.archiveUrl.value.trim()
    }
  };
}

function syncSelectionsAfterSave(payload, previousSlug='') {
  if (!db.site.home.heroSlug) db.site.home.heroSlug = payload.slug;
  if (previousSlug && db.site.home.heroSlug === previousSlug) db.site.home.heroSlug = payload.slug;
  db.site.home.popularSlugs = (db.site.home.popularSlugs || []).map(slug => slug === previousSlug ? payload.slug : slug);
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
  syncSelectionsAfterSave(payload, previousSlug);
  persist();
  selectGame(currentId);
  alert('Oyun kaydedildi.');
});

document.getElementById('newGameBtn').addEventListener('click', () => {
  currentId = null;
  form.reset();
  formTitle.textContent = 'Yeni Oyun';
  deleteBtn.style.display = 'none';
  renderList(searchInput.value);
});

deleteBtn.addEventListener('click', () => {
  if (!currentId) return;
  const game = db.games.find(g => g.id === currentId);
  if (!game) return;
  if (!confirm(`${game.title} silinsin mi?`)) return;
  db.games = db.games.filter(g => g.id !== currentId);
  if (db.site.home.heroSlug === game.slug) db.site.home.heroSlug = db.games[0]?.slug || '';
  db.site.home.popularSlugs = (db.site.home.popularSlugs || []).map(slug => slug === game.slug ? '' : slug);
  persist();
  currentId = db.games[0]?.id || null;
  if (currentId) selectGame(currentId); else { form.reset(); formTitle.textContent = 'Yeni Oyun'; }
  renderList(searchInput.value);
});

searchInput.addEventListener('input', () => renderList(searchInput.value));

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
  renderList();
  selectGame(db.games[0]?.id || null);
  alert('JSON içe aktarıldı.');
});

async function init() {
  const local = localStorage.getItem(STORAGE_KEY);
  db = local ? JSON.parse(local) : await loadRemoteData();
  normalizeDb();
  renderList();
  selectGame(db.games[0]?.id || null);
}

init();
