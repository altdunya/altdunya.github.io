const STORAGE_KEY = 'altdunyaSiteData';
let db = null;
const featuredHeroSlots = document.getElementById('featuredHeroSlots');
const popularSlots = document.getElementById('popularSlots');

async function loadRemoteData() {
  try {
    const res = await fetch('games.json', { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {}
  try {
    const res = await fetch('data/games.json', { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (e) {}
  return { site: { home: { featuredHeroSlugs: [], popularSlugs: [] }, categories: [] }, games: [] };
}

function normalizeDb() {
  db ||= {};
  db.site ||= {};
  db.site.home ||= {};
  db.games ||= [];

  if (!Array.isArray(db.site.home.featuredHeroSlugs)) {
    db.site.home.featuredHeroSlugs = db.site.home.heroSlug ? [db.site.home.heroSlug] : [];
  }
  db.site.home.featuredHeroSlugs = db.site.home.featuredHeroSlugs.filter(Boolean).slice(0, 4);
  while (db.site.home.featuredHeroSlugs.length < 4) db.site.home.featuredHeroSlugs.push('');

  if (!Array.isArray(db.site.home.popularSlugs)) db.site.home.popularSlugs = [];
  db.site.home.popularSlugs = db.site.home.popularSlugs.filter(Boolean).slice(0,10);
  while (db.site.home.popularSlugs.length < 10) db.site.home.popularSlugs.push('');
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function optionsHtml() {
  return ['<option value="">— Seçiniz —</option>']
    .concat(db.games.map(g => `<option value="${g.slug}">${g.title}</option>`))
    .join('');
}

function renderSettings() {
  const options = optionsHtml();

  featuredHeroSlots.innerHTML = Array.from({ length: 4 }).map((_, i) => `
    <label>
      <span>Featured Hero #${i+1}</span>
      <select data-featured-slot="${i}">${options}</select>
    </label>
  `).join('');

  [...featuredHeroSlots.querySelectorAll('select')].forEach((el, i) => {
    el.value = db.site.home.featuredHeroSlugs[i] || '';
    el.addEventListener('change', e => {
      db.site.home.featuredHeroSlugs[i] = e.target.value;
    });
  });

  popularSlots.innerHTML = Array.from({ length: 10 }).map((_, i) => `
    <label>
      <span>Popüler #${i+1}</span>
      <select data-slot="${i}">${options}</select>
    </label>
  `).join('');

  [...popularSlots.querySelectorAll('select')].forEach((el, i) => {
    el.value = db.site.home.popularSlugs[i] || '';
    el.addEventListener('change', e => {
      db.site.home.popularSlugs[i] = e.target.value;
    });
  });
}

document.getElementById('saveSettingsBtn').addEventListener('click', () => {
  persist();
  alert('Site ayarları kaydedildi. JSON dışa aktararak games.json dosyasını güncellemeyi unutma.');
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
  alert('JSON içe aktarıldı.');
});

async function init() {
  const local = localStorage.getItem(STORAGE_KEY);
  db = local ? JSON.parse(local) : await loadRemoteData();
  normalizeDb();
  renderSettings();
}

init();
