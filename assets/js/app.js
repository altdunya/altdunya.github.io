const STORAGE_KEY = 'altdunyaSiteData';
let siteData = null;

const app = document.getElementById('app');
const mainNav = document.getElementById('mainNav');
const slidePanel = document.getElementById('slidePanel');
const panelBackdrop = document.getElementById('panelBackdrop');
const globalSearchInput = document.getElementById('globalSearchInput');
const globalSearchResults = document.getElementById('globalSearchResults');
const siteSearch = document.getElementById('siteSearch');

const STATIC_PAGES = {
  about: {
    title: 'Hakkında',
    kicker: 'AltDünya',
    intro: 'AltDünya, retro oyunları daha düzenli, daha güvenli ve daha kolay erişilebilir hale getirmek için kurulmuş bir arşiv ve içerik platformudur.',
    body: `
      <section class="premium-stack">
        <div class="brand-story-card">
          <div class="section-head"><h2>AltDünya Nedir?</h2></div>
          <p>AltDünya; retro oyunları dağınık kaynaklar arasında kaybolmadan keşfetmek, oyunlara ait temel bilgileri tek yerde görmek ve mümkün olduğunca sade bir deneyim yaşamak isteyenler için oluşturuldu.</p>
          <p>Buradaki amaç sadece bir liste sunmak değil; geçmişin oyunlarını bugünün şartlarında yeniden ulaşılabilir kılmak. Oyun sayfaları, video içerikleri, pack detayları ve kategori yapısı aynı çatı altında buluşur.</p>
        </div>

        <div class="premium-feature-grid">
          <article class="premium-feature-card">
            <div class="premium-icon">🎮</div>
            <h3>Retro odaklı seçki</h3>
            <p>Buradaki oyunlar rastgele değil; nostalji değeri, oynanabilirlik ve ilgi çekicilik düşünülerek seçilir.</p>
          </article>
          <article class="premium-feature-card">
            <div class="premium-icon">⚖️</div>
            <h3>Daha güvenli yaklaşım</h3>
            <p>AltDünya içerikleri mümkün olduğunca güvenli, sürdürülebilir ve daha temiz bir yayın mantığıyla sunar.</p>
          </article>
          <article class="premium-feature-card">
            <div class="premium-icon">⚡</div>
            <h3>Kolay deneyim</h3>
            <p>Amaç karmaşık teknik anlatılar değil; oyunu, bilgiyi ve yönlendirmeyi sade biçimde sunmaktır.</p>
          </article>
        </div>

        <div class="premium-split">
          <div class="panel">
            <h2>AltDünya Ne Sunar?</h2>
            <ul class="legal-list">
              <li>Oyunlara özel sade ve düzenli sayfalar</li>
              <li>Video, pack detayı ve temel bilgiyi tek merkezde toplama</li>
              <li>Freeware, arcade ve konsol klasiklerini kategori bazlı keşfetme</li>
              <li>Zamanla büyüyen, nostalji odaklı bir retro arşiv</li>
            </ul>
          </div>
          <div class="panel">
            <h2>Yaklaşımımız</h2>
            <ul class="legal-list">
              <li>Gereksiz karmaşa yerine sade sunum</li>
              <li>Riskli yönlendirmeler yerine daha kontrollü yapı</li>
              <li>Tek seferlik değil, sürdürülebilir içerik mantığı</li>
              <li>Sadece eski olduğu için değil, bugün de ilgi çektiği için seçilen oyunlar</li>
            </ul>
          </div>
        </div>

        <div class="cta-banner">
          <div>
            <div class="kicker">AltDünya Manifestosu</div>
            <h2>Geçmişin oyunlarını bugünün şartlarında yeniden keşfet.</h2>
            <p>AltDünya'nın hedefi, retro oyunları sadece hatırlatmak değil; onları yeniden erişilebilir, anlaşılır ve keyifli hale getirmektir.</p>
          </div>
          <div class="cta-row">
            <a class="primary-btn" href="#/games">Oyun Arşivine Git</a>
            <a class="secondary-btn" href="#/category/freeware">Freeware Oyunlar</a>
          </div>
        </div>
      </section>
    `
  },
  contact: {
    title: 'İletişim',
    kicker: 'AltDünya',
    intro: 'Geri bildirim, iş birliği, düzeltme talepleri ve genel iletişim için bu sayfa kullanılabilir.',
    body: `
      <section class="premium-stack">
        <div class="premium-split">
          <div class="panel">
            <h2>Bize Nasıl Ulaşabilirsiniz?</h2>
            <p>AltDünya ile ilgili görüş, öneri, hata bildirimi veya iş birliği taleplerinizi aşağıdaki iletişim kanalları üzerinden iletebilirsiniz.</p>
            <ul class="legal-list">
              <li>E-posta: <strong>altdunyadan@gmail.com</strong></li>
              <li>YouTube: <strong>AltDünya</strong></li>
              <li>Site ile ilgili teknik geri bildirimler için e-posta tercih edilir.</li>
            </ul>
          </div>
          <div class="panel">
            <h2>Hangi Konular İçin Yazabilirsiniz?</h2>
            <ul class="legal-list">
              <li>İçerik önerileri ve retro oyun tavsiyeleri</li>
              <li>Bozuk bağlantı, hatalı bilgi veya eksik sayfa bildirimleri</li>
              <li>İş birlikleri ve iletişim talepleri</li>
              <li>Telif veya içerik kaldırma başvuruları</li>
            </ul>
          </div>
        </div>

        <div class="cta-banner">
          <div>
            <div class="kicker">İletişim</div>
            <h2>AltDünya büyürken geri bildirim önemli.</h2>
            <p>Sitede gördüğünüz hataları, eksik bilgileri veya eklenmesini istediğiniz oyunları paylaşmanız arşivin gelişmesine katkı sağlar.</p>
          </div>
          <div class="cta-row">
            <a class="primary-btn" href="mailto:altdunyadan@gmail.com">E-posta Gönder</a>
            <a class="secondary-btn" href="#/about">Hakkında Sayfası</a>
          </div>
        </div>
      </section>
    `
  },
  legal: {
    title: 'Legal',
    kicker: 'AltDünya',
    intro: 'Bu sayfa, sitedeki içeriklerin nasıl konumlandığını ve yasal sorumluluk sınırlarını genel hatlarıyla açıklar.',
    body: `
      <section class="premium-stack">
        <div class="premium-split">
          <div class="legal-card">
            <h2>İçerik Yaklaşımı</h2>
            <ul class="legal-list">
              <li>AltDünya; arşivleme, bilgilendirme ve içerik yönlendirme odaklı bir platformdur.</li>
              <li>Sitede yer alan açıklamalar, görseller ve tanıtım metinleri bilgilendirme amacı taşır.</li>
              <li>Oyun adları, marka adları ve ilgili materyaller kendi hak sahiplerine aittir.</li>
            </ul>
          </div>
          <div class="legal-card">
            <h2>Üçüncü Taraf Bağlantılar</h2>
            <ul class="legal-list">
              <li>Site içinde yer alan dış bağlantılar, ilgili üçüncü taraf platformların kendi kurallarına tabidir.</li>
              <li>AltDünya, üçüncü taraf sitelerin içerik politikalarından ve güncel durumundan doğrudan sorumlu değildir.</li>
              <li>Bağlantılar zaman içinde değişebilir, kaldırılabilir veya geçerliliğini yitirebilir.</li>
            </ul>
          </div>
        </div>

        <div class="legal-card">
          <h2>Telif ve Kaldırma Talepleri</h2>
          <ul class="legal-list">
            <li>Hak sahiplerinden gelecek makul ve doğrulanabilir talepler değerlendirmeye alınır.</li>
            <li>Gerekli görülen durumlarda içerik kaldırılabilir, düzenlenebilir veya erişimden çekilebilir.</li>
            <li>Bu tür talepler için iletişim sayfasındaki e-posta kanalı kullanılabilir.</li>
          </ul>
        </div>

        <div class="cta-banner">
          <div>
            <div class="kicker">Legal Çerçeve</div>
            <h2>Hedefimiz daha güvenli ve sürdürülebilir bir retro arşiv oluşturmaktır.</h2>
            <p>Bu nedenle AltDünya, içeriklerini mümkün olduğunca kontrollü ve şeffaf bir yaklaşımla sunar.</p>
          </div>
          <div class="cta-row">
            <a class="secondary-btn" href="#/contact">İletişime Geç</a>
          </div>
        </div>
      </section>
    `
  },
  privacy: {
    title: 'Gizlilik',
    kicker: 'AltDünya',
    intro: 'Bu sayfa, siteyi ziyaret eden kullanıcıların gizliliğine dair temel yaklaşımı açıklar.',
    body: `
      <section class="premium-stack">
        <div class="premium-split">
          <div class="legal-card">
            <h2>Toplanan Veriler</h2>
            <ul class="legal-list">
              <li>AltDünya, temel gezinme deneyimi dışında kullanıcıdan doğrudan kişisel veri toplamayı hedeflemez.</li>
              <li>İletişim kurulması halinde paylaşılan bilgiler yalnızca ilgili iletişim amacı doğrultusunda değerlendirilir.</li>
            </ul>
          </div>
          <div class="legal-card">
            <h2>Üçüncü Taraf İçerikler</h2>
            <ul class="legal-list">
              <li>Site içinde yer alan gömülü videolar veya dış bağlantılar, kendi platformlarının veri politikalarına tabi olabilir.</li>
              <li>Kullanıcı, üçüncü taraf bir hizmete geçtiğinde ilgili hizmetin gizlilik koşulları geçerli olur.</li>
            </ul>
          </div>
        </div>

        <div class="legal-card">
          <h2>Gelecekteki Güncellemeler</h2>
          <ul class="legal-list">
            <li>İleride analitik, yorum sistemi veya ek kullanıcı özellikleri eklenirse bu sayfa güncellenir.</li>
            <li>Gizlilik yaklaşımında önemli bir değişiklik olduğunda metin revize edilerek sitede yayınlanır.</li>
          </ul>
        </div>

        <div class="cta-banner">
          <div>
            <div class="kicker">Gizlilik</div>
            <h2>Basit yaklaşım: mümkün olduğunca az veri, mümkün olduğunca net bilgi.</h2>
            <p>AltDünya'da amaç kullanıcıyı takip etmek değil; retro içerikleri sade ve güven veren bir yapıda sunmaktır.</p>
          </div>
          <div class="cta-row">
            <a class="secondary-btn" href="#/legal">Legal Sayfası</a>
          </div>
        </div>
      </section>
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
    try {
      let res = await fetch('games.json', { cache: 'no-store' });
      if (!res.ok) res = await fetch('data/games.json', { cache: 'no-store' });
      siteData = await res.json();
    } catch (e) {
      siteData = { site: { categories: [], home: { heroSlug: '', popularSlugs: [] } }, games: [] };
    }
  }
  buildNav();
  setupGlobalSearch();
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

function getHomeHero() {
  return getGameBySlug(siteData.site?.home?.heroSlug) || siteData.games[0];
}

function getHomePopular() {
  const selected = (siteData.site?.home?.popularSlugs || [])
    .map(getGameBySlug)
    .filter(Boolean);
  const fallback = siteData.games.filter(g => !selected.some(s => s.slug === g.slug));
  return [...selected, ...fallback].slice(0, 12);
}

function getHeroSlides() {
  const latest = siteData.games[0];
  const manual = [
    getGameBySlug(siteData.site?.home?.heroSlug),
    ...(siteData.site?.home?.popularSlugs || []).map(getGameBySlug)
  ].filter(Boolean);
  const unique = [];
  [latest, ...manual, ...siteData.games].filter(Boolean).forEach(game => {
    if (!unique.some(item => item.slug === game.slug)) unique.push(game);
  });
  return unique.slice(0, 5);
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

function searchText(game) {
  return [game.title, game.platform, game.genre, game.segment, game.category, ...(game.tags || [])].filter(Boolean).join(' ').toLowerCase();
}

function renderSearchResults(query) {
  if (!globalSearchResults) return;
  const q = (query || '').trim().toLowerCase();
  if (!q) {
    globalSearchResults.innerHTML = '';
    siteSearch?.classList.remove('open');
    return;
  }
  const results = siteData.games.filter(game => searchText(game).includes(q)).slice(0, 7);
  siteSearch?.classList.add('open');
  globalSearchResults.innerHTML = results.length ? results.map(game => `
    <a class="search-result-item" href="#/game/${game.slug}">
      <span class="search-result-thumb" style="background-image:url('${game.cover}')"></span>
      <span><strong>${game.title}</strong><small>${game.platform || '—'} · ${game.genre || game.segment || '—'}</small></span>
    </a>`).join('') : '<div class="search-result-empty">Sonuç bulunamadı.</div>';
}

function setupGlobalSearch() {
  if (!globalSearchInput || globalSearchInput.dataset.ready === '1') return;
  globalSearchInput.dataset.ready = '1';
  globalSearchInput.addEventListener('input', e => renderSearchResults(e.target.value));
  globalSearchInput.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const q = globalSearchInput.value.trim().toLowerCase();
    const first = siteData.games.find(game => searchText(game).includes(q));
    if (first) {
      location.hash = `#/game/${first.slug}`;
      globalSearchInput.value = '';
      globalSearchInput.blur();
      renderSearchResults('');
    }
  });
  document.addEventListener('click', e => {
    if (!siteSearch?.contains(e.target)) renderSearchResults('');
  });
  globalSearchResults?.addEventListener('click', () => {
    globalSearchInput.value = '';
    renderSearchResults('');
  });
}

function renderHome() {
  setActiveNav('home');
  const heroSlides = getHeroSlides();
  const latest = [...siteData.games].slice(0, 5);
  const popular = getHomePopular();
  const videoGames = siteData.games.filter(g => g.videoUrl).slice(0,4);
  const firstSlide = heroSlides[0] || siteData.games[0] || {};

  app.innerHTML = `
    <section class="featured-hero-slider" data-hero-slider>
      <div class="featured-hero-bg" data-hero-bg style="background-image:url('${firstSlide.cover || ''}')"></div>
      <div class="featured-hero-inner">
        <button class="hero-arrow hero-prev" type="button" data-hero-prev aria-label="Önceki oyun">‹</button>
        <div class="featured-hero-copy">
          <div class="kicker">AltDünya Featured</div>
          <h1 data-hero-title>${firstSlide.title || 'AltDünya'}</h1>
          <div class="hero-badges" data-hero-badges>
            <span class="badge">${firstSlide.platform || '—'}</span>
            <span class="badge">${firstSlide.genre || '—'}</span>
            <span class="badge">${firstSlide.segment || '—'}</span>
          </div>
          <p data-hero-description>${firstSlide.shortDescription || ''}</p>
          <div class="cta-row">
            <a class="primary-btn" data-hero-link href="#/game/${firstSlide.slug || ''}">Oyuna Git</a>
            <a class="secondary-btn" data-hero-category href="#/category/${firstSlide.category || 'arcade'}">${labelForCategory(firstSlide.category)}</a>
          </div>
        </div>
        <div class="featured-hero-poster" data-hero-poster style="background-image:url('${firstSlide.cover || ''}')"></div>
        <button class="hero-arrow hero-next" type="button" data-hero-next aria-label="Sonraki oyun">›</button>
      </div>
      <div class="hero-dots" data-hero-dots>
        ${heroSlides.map((_, i) => `<button type="button" class="hero-dot ${i === 0 ? 'active' : ''}" data-hero-dot="${i}" aria-label="Hero ${i+1}"></button>`).join('')}
      </div>
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
            <a class="segment-card" href="#/category/${c.id}"><div><div class="kicker">Kategori</div><div>${c.name}</div></div></a>
          `).join('')}
        </div>
      </div>

      <section class="panel section selection-panel">
        <div class="section-head selection-head">
          <div><div class="kicker">AltDünya</div><h2>AltDünya Seçkisi</h2></div>
          <a class="secondary-btn" href="#/games">Tüm Oyunlar</a>
        </div>
        <div class="selection-grid">${popular.map(gameCard).join('')}</div>
      </section>

      <div class="grid-home">
        <section class="panel section" style="padding:20px">
          <div class="section-head"><h2>Son Videolar</h2></div>
          <div class="mini-list">${videoGames.map(miniGame).join('') || '<div class="search-empty">Henüz video eklenmedi.</div>'}</div>
        </section>
        <aside class="side-stack">
          <div class="side-card">
            <h3>Neden AltDünya?</h3>
            <ul class="trust-list">
              <li>🎮 Retro oyunları modern sistemlerde kolayca oynayabilirsin.</li>
              <li>⚖️ İçerikler güvenli ve sürdürülebilir şekilde hazırlanır.</li>
              <li>⚡ Tek tıkla çalışan paketlerle uğraşmadan direkt oyuna girersin.</li>
            </ul>
          </div>
          <div class="side-card">
            <h3>AltDünya Pack Nedir?</h3>
            <p class="muted">Seçili oyunlar için hazırlanmış, modern sistemlerde daha kolay çalışacak şekilde düzenlenmiş paket sayfalarıdır.</p>
          </div>
        </aside>
      </div>
    </div>
  `;
  setupHeroSlider(heroSlides);
}

function setupHeroSlider(slides) {
  if (!slides || slides.length <= 1) return;
  const root = document.querySelector('[data-hero-slider]');
  if (!root) return;
  let index = 0;
  let timer = null;
  const bg = root.querySelector('[data-hero-bg]');
  const poster = root.querySelector('[data-hero-poster]');
  const title = root.querySelector('[data-hero-title]');
  const badges = root.querySelector('[data-hero-badges]');
  const desc = root.querySelector('[data-hero-description]');
  const link = root.querySelector('[data-hero-link]');
  const cat = root.querySelector('[data-hero-category]');
  const dots = [...root.querySelectorAll('[data-hero-dot]')];
  function paint(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    const game = slides[index];
    bg.style.backgroundImage = `url('${game.cover}')`;
    poster.style.backgroundImage = `url('${game.cover}')`;
    title.textContent = game.title || 'AltDünya';
    badges.innerHTML = `<span class="badge">${game.platform || '—'}</span><span class="badge">${game.genre || '—'}</span><span class="badge">${game.segment || '—'}</span>`;
    desc.textContent = game.shortDescription || '';
    link.href = `#/game/${game.slug}`;
    cat.href = `#/category/${game.category}`;
    cat.textContent = labelForCategory(game.category);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => paint(index + 1), 7000);
  }
  root.querySelector('[data-hero-prev]')?.addEventListener('click', () => { paint(index - 1); restart(); });
  root.querySelector('[data-hero-next]')?.addEventListener('click', () => { paint(index + 1); restart(); });
  dots.forEach(dot => dot.addEventListener('click', () => { paint(Number(dot.dataset.heroDot)); restart(); }));
  restart();
}

function labelForCategory(id) {
  return siteData.site.categories.find(c => c.id === id)?.name || id;
}



function loadDisqus(slug) {
  const canonicalUrl = `${window.location.origin}/game/${slug}`;
  const uniqueIdentifier = `game-${slug}`;

  document.body.setAttribute('data-game', slug);

  window.disqus_config = function () {
    this.page.url = canonicalUrl;
    this.page.identifier = uniqueIdentifier;
    this.page.title = document.title || slug;
  };

  if (window.DISQUS) {
    window.DISQUS.reset({
      reload: true,
      config: window.disqus_config
    });
    return;
  }

  const d = document;
  const s = d.createElement('script');
  s.src = 'https://altdunyadan.disqus.com/embed.js';
  s.setAttribute('data-timestamp', String(+new Date()));
  (d.head || d.body).appendChild(s);
}

window.addEventListener('hashchange', renderRoute);
loadData();
