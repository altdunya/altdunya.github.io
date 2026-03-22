const STORAGE_KEY = 'altdunyaSiteData';
let siteData = null;

const app = document.getElementById('app');
const mainNav = document.getElementById('mainNav');
const slidePanel = document.getElementById('slidePanel');
const panelBackdrop = document.getElementById('panelBackdrop');

const STATIC_PAGES = {
  about: {
    title: 'Hakkında',
    kicker: 'AltDünya',
    intro: 'AltDünya, retro oyunları tek yerde toplamak; oyun sayfası, video ve kolay açılır pack mantığını sade biçimde sunmak için oluşturulmuş bir arşivdir.',
    body: `
      <div class="panel">
        <h2>Bu site ne yapar?</h2>
        <p>Amacı karmaşık bir veri tabanı olmak değil; ziyaretçinin sevdiği oyunu bulup hızlıca oyun sayfasına gitmesini sağlamaktır. Her oyunda özet bilgi, varsa oynanış videosu, pack detayları ve benzer öneriler yer alır.</p>
      </div>
      <div class="panel">
        <h2>Odak noktası</h2>
        <ul class="legal-list">
          <li>Retro klasikler için sade vitrin yapısı</li>
          <li>Kolay açılır pack mantığı</li>
          <li>Video ve oyun sayfasını aynı merkezde toplama</li>
          <li>Kategori bazlı dolaşımı kolaylaştırma</li>
        </ul>
      </div>
    `
  },
  contact: {
    title: 'İletişim',
    kicker: 'AltDünya',
    intro: 'İletişim bilgilerini burada yayınlayabilirsin. Şimdilik yer tutucu bir alan hazırladım.',
    body: `
      <div class="panel">
        <h2>İletişim Bilgileri</h2>
        <p>Bu alana e-posta adresi, YouTube kanal linki, sosyal medya hesapları veya iş birliği iletişim bilgileri eklenebilir.</p>
        <ul class="legal-list">
          <li>E-posta: <strong>iletisim@ornek.com</strong></li>
          <li>YouTube: <strong>AltDünya</strong></li>
          <li>İş birlikleri ve geri bildirimler için ayrı bir adres de eklenebilir.</li>
        </ul>
      </div>
    `
  },
  legal: {
    title: 'Legal',
    kicker: 'AltDünya',
    intro: 'Legal sayfası, sitenin içerik yaklaşımını ve sorumluluk sınırlarını netleştirmek için önemlidir.',
    body: `
      <div class="legal-card">
        <h2>Yasal Notlar</h2>
        <ul class="legal-list">
          <li>Bu sitedeki açıklamalar bilgilendirme ve arşivleme amaçlı hazırlanır.</li>
          <li>Üçüncü taraf bağlantılar kendi platformlarının koşullarına tabidir.</li>
          <li>Telif hakkı sahiplerinden gelecek haklı kaldırma talepleri doğrultusunda içerikler gözden geçirilebilir.</li>
          <li>Marka ve oyun adları ilgili hak sahiplerine aittir.</li>
        </ul>
      </div>
    `
  },
  privacy: {
    title: 'Gizlilik',
    kicker: 'AltDünya',
    intro: 'Gizlilik sayfası kullanıcıya güven verir. Şimdilik temel bir taslak ekledim.',
    body: `
      <div class="legal-card">
        <h2>Gizlilik Politikası Taslağı</h2>
        <ul class="legal-list">
          <li>Site, temel gezinme deneyimi dışında kullanıcıdan ek veri toplamayı hedeflemez.</li>
          <li>Üçüncü taraf gömüler ve bağlantılar kendi veri politikalarına sahip olabilir.</li>
          <li>İleride analitik ya da yorum sistemi eklenecekse bu sayfa güncellenmelidir.</li>
        </ul>
      </div>
    `
  }
};

document.getElementById('menuBtn')?.addEventListener('click', () => {
  slidePanel.classList.add('open');
  panelBackdrop.classList.add('show');
});
document.getElementById('closePanelBtn')?.addEventListener('click', closePanel);
panelBackdrop?.addEventListener('click', closePanel);

document.querySelectorAll('.brand-link')?.forEach(el => {
  el.addEventListener('click', () => location.hash = '#/home');
});

function closePanel() {
  slidePanel.classList.remove('open');
  panelBackdrop.classList.remove('show');
}

async function loadData() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    siteData = JSON.parse(local);
  } else {
    let res;
    try {
      res = await fetch('data/games.json');
      if (!res.ok) throw new Error('data/games.json bulunamadı');
    } catch (err) {
      res = await fetch('games.json');
    }
    siteData = await res.json();
  }
  buildNav();
  renderRoute();
}

function buildNav() {
  const links = [
    { id: 'home', label: 'Ana Sayfa', href: '#/home' },
    { id: 'games', label: 'Oyunlar', href: '#/games' },
    ...siteData.site.categories
      .filter(c => ['konsol', 'arcade', 'freeware'].includes(c.id))
      .map(c => ({ id: c.id, label: c.name, href: `#/category/${c.id}` })),
    { id: 'videolar', label: 'Videolar', href: '#/category/videolar' },
  ];
  mainNav.innerHTML = links.map(link => `<a class="nav-link" data-id="${link.id}" href="${link.href}">${link.label}</a>`).join('');
}

function getRoute() {
  const hash = location.hash.replace('#', '') || '/home';
  const parts = hash.split('/').filter(Boolean);
  return { parts };
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-link').forEach(el => el.classList.toggle('active', el.dataset.id === id));
}

function renderRoute() {
  const { parts } = getRoute();
  closePanel();

  if (parts[0] === 'home') return renderHome();
  if (parts[0] === 'games') return renderGames();
  if (parts[0] === 'category' && parts[1]) return renderCategory(parts[1]);
  if (parts[0] === 'game' && parts[1]) return renderGame(parts[1]);
  if (STATIC_PAGES[parts[0]]) return renderStaticPage(parts[0]);
  return renderHome();
}

function getGameBySlug(slug) {
  return siteData.games.find(g => g.slug === slug);
}

function gameCard(game) {
  return `
    <article class="game-card">
      <a class="game-card-link" href="#/game/${game.slug}">
        <div class="game-thumb" style="background-image:url('${game.cover}')"></div>
        <div class="game-body">
          <h3>${game.title}</h3>
          <div class="meta-row">
            <span class="badge">${game.platform || '—'}</span>
            <span class="badge">${game.segment || '—'}</span>
            <span class="badge">${game.genre || '—'}</span>
          </div>
        </div>
      </a>
    </article>
  `;
}

function miniGame(game) {
  return `
    <a class="mini-item" href="#/game/${game.slug}">
      <div class="mini-thumb" style="background-image:url('${game.cover}')"></div>
      <div>
        <strong>${game.title}</strong>
        <div class="muted">${game.platform || '—'} | ${game.genre || '—'}</div>
      </div>
    </a>
  `;
}

function renderHome() {
  setActiveNav('home');
  const featured = siteData.games[0];
  const latest = [...siteData.games].slice(0, 5);
  const popular = [...siteData.games].slice(0, 10);
  const videoGames = siteData.games.filter(g => g.videoUrl).slice(0,4);

  app.innerHTML = `
    <section class="hero-card">
      <div class="hero-copy">
        <div class="kicker">AltDünya</div>
        <h1>${featured.title}</h1>
        <div class="hero-badges">
          <span class="badge">${featured.platform}</span>
          <span class="badge">${featured.genre}</span>
          <span class="badge">${featured.segment}</span>
        </div>
        <p>${featured.shortDescription}</p>
        <div class="cta-row">
          <a class="primary-btn" href="#/game/${featured.slug}">Oyuna Git</a>
          <a class="secondary-btn" href="#/category/${featured.category}">${labelForCategory(featured.category)}</a>
        </div>
      </div>
      <div class="hero-image" style="background-image:linear-gradient(90deg,rgba(9,11,24,.1),rgba(9,11,24,.05)),url('${featured.cover}')"></div>
    </section>

    <div class="section home-sections">
      <div class="section">
        <div class="section-head"><h2>Yeni Eklenen Oyunlar</h2></div>
        <div class="card-grid">${latest.map(gameCard).join('')}</div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Kategoriler</h2></div>
        <div class="segment-grid">
          ${siteData.site.categories.filter(c => ['freeware','arcade','konsol'].includes(c.id)).map(c => `
            <a class="segment-card" href="#/category/${c.id}">
              <div>
                <div class="kicker">Kategori</div>
                <div>${c.name}</div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>

      <div class="grid-home">
        <section class="panel section" style="padding:20px">
          <div class="section-head"><h2>Popüler Oyunlar</h2></div>
          <div class="card-grid">${popular.map(gameCard).join('')}</div>
        </section>
        <aside class="side-stack">
          <div class="side-card">
            <h3>Popüler Oyunlar</h3>
            <p class="muted">Hızlı erişim için ilk 10 oyun burada listelenir.</p>
            <div class="link-list">${popular.map(game => `<a class="text-link-item" href="#/game/${game.slug}">${game.title}</a>`).join('')}</div>
          </div>
          <div class="side-card">
            <h3>Son Videolar</h3>
            <p class="muted">Video bağlantısı eklenen oyunlar burada öne çıkar.</p>
            <div class="mini-list">${videoGames.map(miniGame).join('') || '<div class="search-empty">Henüz video eklenmedi.</div>'}</div>
          </div>
          <div class="side-card">
            <h3>Neden AltDünya?</h3>
            <ul class="trust-list">
              <li>Oyun kartlarının tamamı doğrudan oyun sayfasına gider.</li>
              <li>Her oyun için sade pack bilgisi ve kurulum adımı sunulur.</li>
              <li>Benzer oyun sistemiyle sitede dolaşım güçlenir.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function renderGames() {
  setActiveNav('games');
  app.innerHTML = `
    <section class="category-hero">
      <div class="kicker">AltDünya Kütüphanesi</div>
      <h1>Tüm Oyunlar</h1>
      <p class="muted">Kategoriler, etiketler ve benzer oyun sistemiyle büyüyebilen oyun vitrini.</p>
    </section>
    <section class="section">
      <div class="card-grid">${siteData.games.map(gameCard).join('')}</div>
    </section>
  `;
}

function renderCategory(categoryId) {
  setActiveNav(categoryId);
  const category = siteData.site.categories.find(c => c.id === categoryId) || { name: 'Kategori', subtitle: '', hero: '' };
  let games = siteData.games.filter(g => g.category === categoryId);
  if (categoryId === 'videolar') games = siteData.games.filter(g => g.videoUrl);
  const allTags = [...new Set(games.flatMap(g => g.tags || []))].slice(0, 10);
  const popular = siteData.games.slice(0, 5);

  app.innerHTML = `
    <section class="category-hero">
      <div class="kicker">Kategori</div>
      <h1>${category.name}</h1>
      <p>${category.subtitle || category.hero}</p>
      <div class="breadcrumb">Ana Sayfa / ${category.name} / Toplam ${games.length} oyun</div>
    </section>

    <section class="filters-bar">
      <div class="filter-group">
        ${allTags.map(tag => `<button class="filter-chip" data-tag="${tag}">${tag}</button>`).join('') || '<span class="muted">Etiket yok.</span>'}
      </div>
      <div class="filter-group">
        <select id="sortSelect">
          <option value="new">Sırala: En Yeniler</option>
          <option value="old">Eskiler</option>
          <option value="az">A-Z</option>
          <option value="mc">Metacritic</option>
        </select>
      </div>
    </section>

    <div class="category-layout">
      <section>
        <div id="categoryGrid" class="card-grid">${games.map(gameCard).join('')}</div>
      </section>
      <aside class="side-stack">
        <div class="side-card">
          <h3>Popüler Etiketler</h3>
          <div class="tags">${allTags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
        </div>
        <div class="side-card">
          <h3>Öne Çıkan Oyunlar</h3>
          <div class="mini-list">${popular.map(miniGame).join('')}</div>
        </div>
      </aside>
    </div>
  `;

  const grid = document.getElementById('categoryGrid');
  const chips = [...document.querySelectorAll('.filter-chip')];
  const sortSelect = document.getElementById('sortSelect');
  let activeTag = null;

  function draw() {
    let filtered = [...games];
    if (activeTag) filtered = filtered.filter(g => (g.tags || []).includes(activeTag));
    const sort = sortSelect.value;
    if (sort === 'new') filtered.sort((a,b) => (b.year || 0) - (a.year || 0));
    if (sort === 'old') filtered.sort((a,b) => (a.year || 0) - (b.year || 0));
    if (sort === 'az') filtered.sort((a,b) => a.title.localeCompare(b.title, 'tr'));
    if (sort === 'mc') filtered.sort((a,b) => (b.metacritic || -1) - (a.metacritic || -1));
    grid.innerHTML = filtered.length ? filtered.map(gameCard).join('') : '<div class="search-empty">Sonuç bulunamadı.</div>';
  }

  chips.forEach(chip => chip.addEventListener('click', () => {
    const tag = chip.dataset.tag;
    activeTag = activeTag === tag ? null : tag;
    chips.forEach(c => c.classList.toggle('active', c.dataset.tag === activeTag));
    draw();
  }));
  sortSelect.addEventListener('change', draw);
}

function renderGame(slug) {
  const game = getGameBySlug(slug);
  if (!game) {
    app.innerHTML = '<div class="search-empty">Oyun bulunamadı.</div>';
    return;
  }
  setActiveNav(game.category);
  const similar = getSimilarGames(game).slice(0,4);

  app.innerHTML = `
    <section class="hero-card">
      <div class="hero-copy">
        <div class="kicker">${game.segment || 'AltDünya'}</div>
        <h1>${game.title}</h1>
        <div class="hero-badges">
          <span class="badge">${game.platform || '—'}</span>
          <span class="badge">${game.genre || '—'}</span>
          <span class="badge">${game.year || '—'}</span>
        </div>
        <p>${game.shortDescription || 'Açıklama yakında eklenecek.'}</p>
        <div class="cta-row">
          <button class="primary-btn" id="packJumpBtn">Pack Detayları</button>
          <a class="secondary-btn" href="#/category/${game.category}">${labelForCategory(game.category)}</a>
        </div>
      </div>
      <div class="hero-image" style="background-image:linear-gradient(90deg,rgba(9,11,24,.15),rgba(9,11,24,.1)),url('${game.cover}')"></div>
    </section>

    <section class="section layout-game">
      <div>
        <div class="panel" style="padding:20px">
          <div class="section-head"><h2>Oynanış Videosu</h2></div>
          ${game.videoUrl ? `<div class="embed-wrap"><iframe src="${game.videoUrl}" title="${game.title} video" allowfullscreen></iframe></div>` : `<div class="placeholder">Bu oyun için oynanış videosu yakında gelecek.</div>`}
        </div>

        <div class="panel section" style="padding:20px">
          <div class="section-head"><h2>Oyun Hakkında</h2></div>
          <p style="line-height:1.8;color:#d7ddf7">${game.story || 'Bu oyunun açıklaması yakında eklenecek.'}</p>
        </div>

        <div class="panel section" style="padding:20px">
          <div class="section-head"><h2>Ekran Görüntüleri</h2></div>
          ${renderGallery(game)}
        </div>

        <div class="panel section pack-box" id="packSection" style="padding:20px">
          <div class="section-head"><h2>Pack Detayları</h2></div>
          <div class="info-list">
            <div class="info-item"><span>Sürüm</span><span>${game.pack?.version || '—'}</span></div>
            <div class="info-item"><span>Boyut</span><span>${game.pack?.size || '—'}</span></div>
            <div class="info-item"><span>Kontroller</span><span>${game.pack?.controls || '—'}</span></div>
            <div class="info-item"><span>Notlar</span><span>${game.pack?.notes || 'Pack bilgileri güncelleniyor.'}</span></div>
          </div>
          <ol>${(game.pack?.steps?.length ? game.pack.steps : ['Pack adımları yakında eklenecek.']).map(s => `<li>${s}</li>`).join('')}</ol>
          <div class="cta-row">
            ${game.pack?.archiveUrl ? `<a class="primary-btn" href="${game.pack.archiveUrl}" target="_blank" rel="noopener noreferrer">Archive.org Üzerinden İndir</a>` : `<span class="secondary-btn">İndirme bağlantısı yakında</span>`}
          </div>
        </div>

        <div class="comment-card section" style="padding:20px">
          <div class="section-head"><h2>AltDünya Yorumları</h2></div>
          <div class="disqus-placeholder">
            <strong>Disqus alanı burada yer alacak.</strong>
            <p class="muted">Kurulum için Disqus shortname bilgini eklediğinde gerçek yorum alanı aktif olur.</p>
            <div id="disqus_thread"></div>
          </div>
        </div>

        <div class="section">
          <div class="section-head"><h2>Benzer Oyunlar</h2></div>
          <div class="card-grid">${similar.map(gameCard).join('')}</div>
        </div>
      </div>

      <aside class="sticky-col side-stack">
        <div class="info-card side-card">
          <h3>Oyun Künyesi</h3>
          <div class="info-list">
            <div class="info-item"><span>Platform</span><span>${game.platform || '—'}</span></div>
            <div class="info-item"><span>Tür</span><span>${game.genre || '—'}</span></div>
            <div class="info-item"><span>Çıkış Yılı</span><span>${game.year || '—'}</span></div>
            <div class="info-item"><span>Geliştirici</span><span>${game.developer || '—'}</span></div>
            <div class="info-item"><span>Dağıtıcı</span><span>${game.publisher || '—'}</span></div>
            <div class="info-item"><span>Metacritic</span><span>${game.metacritic ?? '—'}</span></div>
            <div class="info-item"><span>Oyuncu</span><span>${game.players || '—'}</span></div>
            <div class="info-item"><span>Seri</span><span>${game.series || '—'}</span></div>
          </div>
          <div class="section" style="margin-top:16px">
            <div class="muted" style="margin-bottom:10px">Etiketler</div>
            <div class="tags">${(game.tags?.length ? game.tags : ['Bilgi eklenecek']).map(tag => `<a class="tag" href="#/category/${game.category}">${tag}</a>`).join('')}</div>
          </div>
          <div class="cta-row"><button class="primary-btn" id="packJumpBtnSide">Pack Detayları</button></div>
        </div>
      </aside>
    </section>
  `;

  document.getElementById('packJumpBtn')?.addEventListener('click', () => document.getElementById('packSection').scrollIntoView({behavior:'smooth'}));
  document.getElementById('packJumpBtnSide')?.addEventListener('click', () => document.getElementById('packSection').scrollIntoView({behavior:'smooth'}));
  bindGallery();
}

function renderStaticPage(pageId) {
  setActiveNav('');
  const page = STATIC_PAGES[pageId];
  app.innerHTML = `
    <section class="simple-page">
      <section class="category-hero">
        <div class="kicker">${page.kicker}</div>
        <h1>${page.title}</h1>
        <p>${page.intro}</p>
      </section>
      ${page.body}
    </section>
  `;
}

function renderGallery(game) {
  if (!game.screenshots || !game.screenshots.length) {
    return '<div class="placeholder">Ekran görüntüleri yakında eklenecek.</div>';
  }
  return `
    <div class="gallery-main" id="galleryMain" style="background-image:url('${game.screenshots[0]}')"></div>
    <div class="gallery-thumbs">${game.screenshots.map((src, idx) => `<button class="gallery-thumb" data-src="${src}" aria-label="Ekran görüntüsü ${idx+1}" style="background-image:url('${src}')"></button>`).join('')}</div>
  `;
}

function bindGallery() {
  const main = document.getElementById('galleryMain');
  document.querySelectorAll('.gallery-thumb').forEach(btn => btn.addEventListener('click', () => {
    main.style.backgroundImage = `url('${btn.dataset.src}')`;
  }));
}

function getSimilarGames(game) {
  return siteData.games
    .filter(other => other.slug !== game.slug)
    .map(other => {
      let score = 0;
      if (other.category === game.category) score += 4;
      if (other.genre === game.genre) score += 5;
      if (other.platform === game.platform) score += 3;
      if (other.series && other.series === game.series) score += 6;
      const sharedTags = (other.tags || []).filter(tag => (game.tags || []).includes(tag)).length;
      score += sharedTags * 2;
      return { other, score };
    })
    .sort((a,b) => b.score - a.score)
    .map(entry => entry.other);
}

function labelForCategory(id) {
  return siteData.site.categories.find(c => c.id === id)?.name || id;
}

window.addEventListener('hashchange', renderRoute);
loadData();
