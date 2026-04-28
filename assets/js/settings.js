const STORAGE_KEY = 'altdunyaSiteData';
let db = null;
const heroSelect = document.getElementById('heroSelect');
const featuredSlots = document.getElementById('featuredSlots');
const popularSlots = document.getElementById('popularSlots');

async function loadRemoteData() {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) return JSON.parse(local);
  } catch (e) {}
  try {
    const res = await fetch('games.json', { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {}
  try {
    const res = await fetch('data/games.json', { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return { site: { home: { heroSlug: '', featuredSlugs: [], popularSlugs: [] }, categories: [] }, games: [] };
}

function normalizeDb() {
  db ||= {};
  db.site ||= {};
  db.site.home ||= {};
  db.games ||= [];
  if (!db.site.home.heroSlug) db.site.home.heroSlug = db.games[0]?.slug || '';
  if (!Array.isArray(db.site.home.featuredSlugs)) db.site.home.featuredSlugs = [];
  db.site.home.featuredSlugs = db.site.home.featuredSlugs.filter(Boolean).slice(0, 4);
  while (db.site.home.featuredSlugs.length < 4) db.site.home.featuredSlugs.push('');
  if (!Array.isArray(db.site.home.popularSlugs)) db.site.home.popularSlugs = [];
  db.site.home.popularSlugs = db.site.home.popularSlugs.filter(Boolean).slice(0, 12);
  while (db.site.home.popularSlugs.length < 12) db.site.home.popularSlugs.push('');
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function optionsHtml() {
  return ['<option value="">— Seçiniz —</option>']
    .concat(db.games.map(g => `<option value="${g.slug}">${g.title}</option>`))
    .join('');
}

function renderSlotGroup(container, key, count, label) {
  const options = optionsHtml();
  container.innerHTML = Array.from({ length: count }).map((_, i) => `
    <label>
      <span>${label} #${i+1}</span>
      <select data-slot="${i}">${options}</select>
    </label>
  `).join('');
  [...container.querySelectorAll('select')].forEach((el, i) => {
    el.value = db.site.home[key][i] || '';
    el.addEventListener('change', e => {
      db.site.home[key][i] = e.target.value;
    });
  });
}

function renderSettings() {
  const options = optionsHtml();
  heroSelect.innerHTML = options;
  heroSelect.value = db.site.home.heroSlug || '';
  renderSlotGroup(featuredSlots, 'featuredSlugs', 4, 'Featured Hero');
  renderSlotGroup(popularSlots, 'popularSlugs', 12, 'AltDünya Seçkisi');
}

heroSelect.addEventListener('change', e => { db.site.home.heroSlug = e.target.value; });

document.getElementById('saveSettingsBtn').addEventListener('click', () => {
  normalizeDb();
  persist();
  alert('Site ayarları kaydedildi. JSON dışa aktararak games.json dosyanı güncelleyebilirsin.');
});

document.getElementById('exportBtn').addEventListener('click', () => {
  normalizeDb();
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
  alert('JSON içe aktarıldı.');
});

async function init() {
  db = await loadRemoteData();
  normalizeDb();
  renderSettings();
}

init();
