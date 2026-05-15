const STORAGE_KEY = 'altdunyaSiteData';
let siteData = null;
let blogData = { categories: [], posts: [] };

const app = document.getElementById('app');
const mainNav = document.getElementById('mainNav');
const slidePanel = document.getElementById('slidePanel');
const panelBackdrop = document.getElementById('panelBackdrop');
const siteSearch = document.getElementById('siteSearch');
const searchResults = document.getElementById('searchResults');
let homeHeroTimer = null;

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

async function loadBlogData() {
  try {
    const res = await fetch('data/blog.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Blog data not found');
    blogData = await res.json();
  } catch (e) {
    blogData = { categories: [], posts: [] };
  }
  blogData.categories ||= [];
  blogData.posts ||= [];
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
  normalizeSiteData();
  await loadBlogData();
  buildNav();
  initSiteSearch();
  renderRoute();
}


function normalizeSiteData() {
  siteData ||= { site: {}, games: [] };
  siteData.site ||= {};
  siteData.site.home ||= {};
  siteData.site.categories ||= [];
  siteData.games ||= [];

  if (!Array.isArray(siteData.site.home.popularSlugs)) siteData.site.home.popularSlugs = [];
  siteData.site.home.popularSlugs = siteData.site.home.popularSlugs.filter(Boolean).slice(0, 12);
  while (siteData.site.home.popularSlugs.length < 12) siteData.site.home.popularSlugs.push('');

  if (!Array.isArray(siteData.site.home.featuredSlugs)) siteData.site.home.featuredSlugs = [];
  siteData.site.home.featuredSlugs = siteData.site.home.featuredSlugs.filter(Boolean).slice(0, 4);
  while (siteData.site.home.featuredSlugs.length < 4) siteData.site.home.featuredSlugs.push('');

  if (!siteData.site.home.heroSlug) siteData.site.home.heroSlug = siteData.games[0]?.slug || '';
}

function esc(value) {
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[ch]));
}

function uniqueGames(games) {
  const seen = new Set();
  return games.filter(game => {
    if (!game || !game.slug || seen.has(game.slug)) return false;
    seen.add(game.slug);
    return true;
  });
}

function buildNav() {
  const links = [
    { id: 'home', label: 'Ana Sayfa', href: '#/home' },
    { id: 'games', label: 'Oyunlar', href: '#/games' },
    ...siteData.site.categories
      .filter(c => ['konsol', 'arcade', 'freeware'].includes(c.id))
      .map(c => ({ id: c.id, label: c.name, href: `#/category/${c.id}` })),
    { id: 'videolar', label: 'Videolar', href: '#/category/videolar' },
    { id: 'website', label: 'Website', href: '#/website' },
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
  if (parts[0] === 'website') return parts[1] ? renderWebsiteCategory(parts[1]) : renderWebsiteHome();
  if (parts[0] === 'post' && parts[1]) return renderBlogPost(parts[1]);
  if (STATIC_PAGES[parts[0]]) return renderStaticPage(parts[0]);
  return renderHome();
}

function getGameBySlug(slug) {
  return siteData.games.find(g => g.slug === slug);
}

function getHomeHero() {
  return getGameBySlug(siteData.site?.home?.heroSlug) || siteData.games[0];
}

function getHomeHeroSlides() {
  const latest = siteData.games[0];
  const manual = (siteData.site?.home?.featuredSlugs || []).map(getGameBySlug).filter(Boolean);
  const oldHero = getHomeHero();
  const fallback = getHomePopular();
  return uniqueGames([latest, ...manual, oldHero, ...fallback]).slice(0, 5);
}

function getHomePopular() {
  const selected = (siteData.site?.home?.popularSlugs || [])
    .map(getGameBySlug)
    .filter(Boolean);
  const fallback = siteData.games.filter(g => !selected.some(s => s.slug === g.slug));
  return [...selected, ...fallback].slice(0, 12);
}


function getBlogCategory(id) {
  return blogData.categories.find(c => c.id === id) || { id, name: id, description: '' };
}

function getBlogPost(slug) {
  return blogData.posts.find(post => post.slug === slug);
}

function getFeaturedBlogPosts(limit = 3) {
  const posts = [...(blogData.posts || [])];
  if (!posts.length) return [];
  const daySeed = Math.floor(Date.now() / 86400000);
  return posts
    .map((post, index) => ({ post, score: Math.sin((index + 1) * 999 + daySeed) }))
    .sort((a, b) => b.score - a.score)
    .map(entry => entry.post)
    .slice(0, limit);
}

function safeUrl(value) {
  const url = String(value || '').trim();
  if (!url) return '';
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('assets/') || url.startsWith('blogimages/') || url.startsWith('./') || url.startsWith('../')) return url;
  return '';
}

function renderPostContent(content) {
  if (!content) return '';
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';

  return content.map(block => {
    if (!block) return '';
    const type = block.type || 'paragraph';
    const text = block.text || '';
    const level = Math.min(Math.max(Number(block.level || 2), 2), 4);

    if (type === 'heading') return `<h${level}>${esc(text)}</h${level}>`;
    if (type === 'quote') return `<blockquote>${esc(text)}</blockquote>`;
    if (type === 'list') return `<ul>${(block.items || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
    if (type === 'orderedList') return `<ol>${(block.items || []).map(item => `<li>${esc(item)}</li>`).join('')}</ol>`;
    if (type === 'image') {
      const src = safeUrl(block.src || block.url);
      if (!src) return '';
      const alt = block.alt || block.caption || '';
      return `<figure><img src="${esc(src)}" alt="${esc(alt)}">${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}</figure>`;
    }
    if (type === 'html') return String(block.html || '');
    if (type === 'hr') return '<hr>';
    return `<p>${esc(text)}</p>`;
  }).join('');
}

function blogCard(post) {
  const category = getBlogCategory(post.category);
  return `
    <article class="blog-card">
      <a class="blog-card-link" href="#/post/${esc(post.slug)}">
        <div class="blog-thumb" style="background-image:url('${esc(post.cover || 'assets/images/logo.png')}')">
          <span>${esc(category.name || 'Yazı')}</span>
        </div>
        <div class="blog-card-body">
          <div class="kicker">${esc(category.name || 'AltDünya Website')}</div>
          <h3>${esc(post.title)}</h3>
          <p>${esc(post.excerpt || '')}</p>
          <div class="meta-row">
            <span class="badge">${esc(post.segment || category.name || 'Yazı')}</span>
            <span class="badge">${esc(post.date || 'Arşiv')}</span>
          </div>
        </div>
      </a>
    </article>
  `;
}

function miniPost(post) {
  const category = getBlogCategory(post.category);
  return `
    <a class="mini-item mini-post" href="#/post/${esc(post.slug)}">
      <div class="mini-thumb blog-mini-thumb">${esc((post.segment || category.name || 'Y')[0])}</div>
      <div>
        <strong>${esc(post.title)}</strong>
        <div class="muted">${esc(category.name || 'Website')} | ${esc(post.date || 'Arşiv')}</div>
      </div>
    </a>
  `;
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
  clearInterval(homeHeroTimer);
  const slides = getHomeHeroSlides();
  const latest = [...siteData.games].slice(0, 5);
  const popular = getHomePopular();
  const videoGames = siteData.games.filter(g => g.videoUrl).slice(0,4);

  const heroSlidesHtml = slides.map((game, idx) => `
    <article class="hero-slide ${idx === 0 ? 'active' : ''}" data-hero-slide="${idx}">
      <div class="hero-copy">
        <div class="kicker">AltDünya Featured</div>
        <h1>${esc(game.title)}</h1>
        <div class="hero-badges">
          <span class="badge">${esc(game.platform || '—')}</span>
          <span class="badge">${esc(game.genre || '—')}</span>
          <span class="badge">${esc(game.segment || '—')}</span>
        </div>
        <p>${esc(game.shortDescription || '')}</p>
        <div class="cta-row">
          <a class="primary-btn" href="#/game/${esc(game.slug)}">Oyuna Git</a>
          <a class="secondary-btn" href="#/category/${esc(game.category)}">${esc(labelForCategory(game.category))}</a>
        </div>
      </div>
      <div class="hero-image" style="background-image:linear-gradient(90deg,rgba(9,11,24,.1),rgba(9,11,24,.05)),url('${esc(game.cover)}')"></div>
    </article>
  `).join('');

  app.innerHTML = `
    <section class="hero-card hero-slider" data-active-slide="0">
      <div class="hero-slider-stage">${heroSlidesHtml}</div>
      ${slides.length > 1 ? `
        <button class="hero-arrow hero-prev" type="button" aria-label="Önceki oyun">‹</button>
        <button class="hero-arrow hero-next" type="button" aria-label="Sonraki oyun">›</button>
        <div class="hero-dots">
          ${slides.map((_, idx) => `<button type="button" class="hero-dot ${idx === 0 ? 'active' : ''}" data-hero-dot="${idx}" aria-label="Hero ${idx+1}"></button>`).join('')}
        </div>
      ` : ''}
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

      <section class="panel section showcase-section">
        <div class="section-head">
          <div>
            <h2>AltDünya Seçkisi</h2>
            <p class="muted">AltDünya arşivinden öne çıkan seçilmiş oyunlar.</p>
          </div>
        </div>
        <div class="card-grid showcase-grid">${popular.map(gameCard).join('')}</div>
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
            <div class="section-head compact-head">
              <h3>Website Arşivinden</h3>
              <a class="tiny-link" href="#/website">Tümü</a>
            </div>
            <div class="mini-list">${getFeaturedBlogPosts(3).map(miniPost).join('') || '<div class="search-empty">Blog yazıları yakında.</div>'}</div>
          </div>
        </aside>
      </div>
    </div>
  `;

  bindHeroSlider(slides.length);
}

function bindHeroSlider(count) {
  if (count <= 1) return;
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  let active = 0;
  const setSlide = idx => {
    active = (idx + count) % count;
    slider.dataset.activeSlide = String(active);
    slider.querySelectorAll('.hero-slide').forEach((el, i) => el.classList.toggle('active', i === active));
    slider.querySelectorAll('.hero-dot').forEach((el, i) => el.classList.toggle('active', i === active));
  };
  slider.querySelector('.hero-prev')?.addEventListener('click', () => setSlide(active - 1));
  slider.querySelector('.hero-next')?.addEventListener('click', () => setSlide(active + 1));
  slider.querySelectorAll('.hero-dot').forEach(btn => btn.addEventListener('click', () => setSlide(Number(btn.dataset.heroDot || 0))));
  homeHeroTimer = setInterval(() => setSlide(active + 1), 7000);
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
  const popular = getHomePopular().slice(0, 5);

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
          <div class="disqus-live">
            <p class="muted">Bu oyun hakkında ne düşünüyorsun? Çalıştırabildin mi yoksa çocukluğun geri mi geldi? 👇</p>
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
  loadDisqus(slug);
}


function renderWebsiteHome() {
  setActiveNav('website');
  const posts = blogData.posts || [];
  const latest = posts.slice(0, 6);
  const featured = posts.filter(p => p.featured).slice(0, 4);
  app.innerHTML = `
    <section class="website-hero">
      <div class="website-hero-copy">
        <div class="kicker">AltDünya Website</div>
        <h1>Blog, arşiv yazıları ve geek kültürü dosyaları.</h1>
        <p>Bu bölüm oyun indirme arşivinden bağımsız çalışır. Eski AltDünya yazıları, AltFacts, AltHistory, AltReview ve nostaljik yorumlar burada kendi alanında döner.</p>
        <div class="cta-row">
          <a class="primary-btn" href="#/website/altfacts">AltFacts</a>
          <a class="secondary-btn" href="#/website/althistory">AltHistory</a>
          <a class="secondary-btn" href="#/website/altreview">AltReview</a>
        </div>
      </div>
      <div class="website-orbit" aria-hidden="true">
        <div class="orbit-ring"></div>
        <div class="orbit-ufo">🛸</div>
        <div class="orbit-title">WEBSITE</div>
      </div>
    </section>

    <section class="section website-categories">
      <div class="section-head"><h2>Website Bölümleri</h2></div>
      <div class="segment-grid">
        ${blogData.categories.map(category => `
          <a class="segment-card website-segment" href="#/website/${esc(category.id)}">
            <div>
              <div class="kicker">${esc(category.label || 'Yazı')}</div>
              <div>${esc(category.name)}</div>
              <p>${esc(category.description || '')}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>Öne Çıkan Yazılar</h2></div>
      <div class="blog-grid">${(featured.length ? featured : latest).map(blogCard).join('') || '<div class="search-empty">Henüz yazı eklenmedi.</div>'}</div>
    </section>

    <section class="section">
      <div class="section-head"><h2>Son Yazılar</h2></div>
      <div class="blog-grid">${latest.map(blogCard).join('') || '<div class="search-empty">Henüz yazı eklenmedi.</div>'}</div>
    </section>
  `;
}

function renderWebsiteCategory(categoryId) {
  setActiveNav('website');
  const category = getBlogCategory(categoryId);
  const posts = (blogData.posts || []).filter(post => post.category === categoryId);
  app.innerHTML = `
    <section class="category-hero website-category-hero">
      <div class="kicker">AltDünya Website</div>
      <h1>${esc(category.name)}</h1>
      <p>${esc(category.description || 'AltDünya arşivinden seçilmiş yazılar.')}</p>
      <div class="breadcrumb"><a href="#/website">Website</a> / ${esc(category.name)} / Toplam ${posts.length} yazı</div>
    </section>
    <section class="section">
      <div class="blog-grid">${posts.map(blogCard).join('') || '<div class="search-empty">Bu bölümde henüz yazı yok.</div>'}</div>
    </section>
  `;
}

function renderBlogPost(slug) {
  setActiveNav('website');
  const post = getBlogPost(slug);
  if (!post) {
    app.innerHTML = '<div class="search-empty">Yazı bulunamadı.</div>';
    return;
  }
  const category = getBlogCategory(post.category);
  const related = (blogData.posts || []).filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  app.innerHTML = `
    <article class="blog-post-layout">
      <header class="blog-post-hero">
        <div class="kicker">${esc(category.name || 'AltDünya Website')}</div>
        <h1>${esc(post.title)}</h1>
        <p>${esc(post.excerpt || '')}</p>
        <div class="hero-badges">
          <span class="badge">${esc(post.segment || category.name || 'Yazı')}</span>
          <span class="badge">${esc(post.date || 'Arşiv')}</span>
          ${post.sourceUrl ? `<a class="badge" href="${esc(post.sourceUrl)}" target="_blank" rel="noopener noreferrer">Wayback Kaynağı</a>` : ''}
        </div>
      </header>

      <div class="blog-post-grid">
        <main class="blog-post-body panel">
          ${renderPostContent(post.content)}
        </main>
        <aside class="side-stack">
          <div class="side-card">
            <h3>Website Bölümleri</h3>
            <div class="footer-links blog-side-links">
              ${blogData.categories.map(cat => `<a href="#/website/${esc(cat.id)}">${esc(cat.name)}</a>`).join('')}
            </div>
          </div>
          <div class="side-card">
            <h3>Benzer Yazılar</h3>
            <div class="mini-list">${related.map(miniPost).join('') || '<div class="search-empty">Benzer yazı yok.</div>'}</div>
          </div>
        </aside>
      </div>
    </article>
  `;
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





function initSiteSearch() {
  if (!siteSearch || !searchResults) return;
  const renderResults = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.classList.remove('open');
      searchResults.innerHTML = '';
      return;
    }
    const results = siteData.games.filter(game => {
      const haystack = [game.title, game.platform, game.genre, game.segment, game.category, ...(game.tags || [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    }).slice(0, 8);

    searchResults.innerHTML = results.length ? results.map(game => `
      <a class="site-search-item" href="#/game/${esc(game.slug)}">
        <span class="site-search-thumb" style="background-image:url('${esc(game.cover)}')"></span>
        <span>
          <strong>${esc(game.title)}</strong>
          <small>${esc(game.platform || '—')} · ${esc(game.genre || '—')}</small>
        </span>
      </a>
    `).join('') : '<div class="site-search-empty">Sonuç bulunamadı.</div>';
    searchResults.classList.add('open');
  };

  siteSearch.addEventListener('input', e => renderResults(e.target.value));
  siteSearch.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      siteSearch.value = '';
      renderResults('');
      siteSearch.blur();
    }
  });
  searchResults.addEventListener('click', () => {
    siteSearch.value = '';
    renderResults('');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.site-search')) searchResults.classList.remove('open');
  });
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
