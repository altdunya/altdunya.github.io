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
    { id: 'website', label: 'AltLibrary', href: '#/website' },
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
  if (parts[0] === 'library-category' && parts[1]) return renderWebsiteCategory(parts[1]);
  if (parts[0] === 'website') return renderWebsiteHome();
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



function getBlogCover(post) {
  return post.cover || post.image || 'assets/images/logo.png';
}

function normalizeBlogDateValue(dateValue, index = 0) {
  if (!dateValue) return 0;
  const str = String(dateValue).trim();
  const iso = Date.parse(str);
  if (!Number.isNaN(iso)) return iso;
  const year = str.match(/(19|20)\d{2}/);
  if (year) return Date.parse(`${year[0]}-01-01`) + index;
  return index;
}

function getSortedBlogPosts() {
  return [...(blogData.posts || [])]
    .map((post, index) => ({ post, index, score: normalizeBlogDateValue(post.date, index) }))
    .sort((a, b) => b.score - a.score)
    .map(entry => entry.post);
}

function getDynamicBlogCategories() {
  const map = new Map();

  (blogData.categories || []).forEach(cat => {
    if (!cat || !cat.id) return;
    map.set(cat.id, {
      id: cat.id,
      name: cat.name || cat.id,
      description: cat.description || cat.label || '',
      count: 0
    });
  });

  (blogData.posts || []).forEach(post => {
    const id = post.category || 'arsiv';
    const existing = map.get(id) || {
      id,
      name: post.segment || id,
      description: '',
      count: 0
    };
    existing.count += 1;
    if (!existing.name || existing.name === id) existing.name = post.segment || id;
    map.set(id, existing);
  });

  return [...map.values()].filter(cat => cat.count > 0 || (blogData.posts || []).some(p => p.category === cat.id));
}

function getBlogTags() {
  const tags = new Map();
  (blogData.posts || []).forEach(post => {
    const candidates = [
      post.segment,
      ...(Array.isArray(post.tags) ? post.tags : []),
      ...(typeof post.tags === 'string' ? post.tags.split(',') : [])
    ].filter(Boolean);

    candidates.forEach(tag => {
      const clean = String(tag).trim();
      if (!clean) return;
      tags.set(clean, (tags.get(clean) || 0) + 1);
    });
  });
  return [...tags.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }));
}

function getLatestUpdates(limit = 6) {
  const updates = [];

  const games = [...(siteData.games || [])].slice(0, 6);
  games.forEach(game => {
    if (!game) return;
    updates.push({
      type: 'game',
      label: 'Yeni Oyun Eklendi',
      title: game.title,
      href: `#/game/${game.slug}`,
      date: game.date || game.updatedAt || game.createdAt || ''
    });
    if (game.videoUrl) {
      updates.push({
        type: 'video',
        label: 'Oyun Video Eklendi',
        title: game.title,
        href: `#/game/${game.slug}`,
        date: game.updatedAt || game.date || ''
      });
    }
    if (Array.isArray(game.screenshots) && game.screenshots.length) {
      updates.push({
        type: 'image',
        label: 'Oyun Ekran Görüntüsü Eklendi',
        title: game.title,
        href: `#/game/${game.slug}`,
        date: game.updatedAt || game.date || ''
      });
    }
  });

  getSortedBlogPosts().slice(0, 8).forEach(post => {
    updates.push({
      type: 'post',
      label: 'Yeni Yazı Eklendi',
      title: `${post.segment || getBlogCategory(post.category).name || 'Yazı'} - ${post.title}`,
      href: `#/post/${post.slug}`,
      date: post.date || ''
    });
  });

  return updates
    .map((item, index) => ({ ...item, score: normalizeBlogDateValue(item.date, index) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function updateIcon(type) {
  return ({ game:'🎮', post:'📚', video:'🎥', image:'🖼️', update:'🛠️' }[type] || '🛸');
}

function renderUpdatesFeed(limit = 6) {
  const updates = getLatestUpdates(limit);
  if (!updates.length) return '';
  return `
    <section class="panel section latest-updates-panel">
      <div class="section-head">
        <div>
          <h2>Son Gelişmeler</h2>
          <p class="muted">AltDünya’da yeni eklenen oyunlar, yazılar, videolar ve güncellemeler.</p>
        </div>
      </div>
      <div class="updates-list">
        ${updates.map(item => `
          <a class="update-item" href="${esc(item.href)}">
            <span class="update-icon">${updateIcon(item.type)}</span>
            <span><strong>${esc(item.label)}:</strong> ${esc(item.title || '')}</span>
          </a>
        `).join('')}
      </div>
    </section>
  `;
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

function renderInlineMarkdown(text) {
  return esc(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function renderSmartParagraph(text) {
  const raw = String(text || '').trim();
  const identityMatches = [...raw.matchAll(/\*\*([^*]+?):\*\*\s*([\s\S]*?)(?=\s*\*\*[^*]+?:\*\*|$)/g)];
  if (identityMatches.length >= 2) {
    return `<div class="identity-card">${identityMatches.map(match => `
      <div class="identity-row"><span>${esc(match[1])}</span><strong>${renderInlineMarkdown(match[2].trim())}</strong></div>
    `).join('')}</div>`;
  }
  return `<p>${renderInlineMarkdown(raw).replace(/\n/g, '<br>')}</p>`;
}

function renderMarkdown(md) {
  const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let paragraph = [];
  let list = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(renderSmartParagraph(paragraph.join('\n')));
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    html.push(`<ul>${list.map(item => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`);
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { flushParagraph(); flushList(); continue; }
    if (/^---+$/.test(trimmed)) { flushParagraph(); flushList(); html.push('<hr>'); continue; }
    const img = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) { flushParagraph(); flushList(); html.push(`<figure><img src="${esc(img[2])}" alt="${esc(img[1])}">${img[1] ? `<figcaption>${esc(img[1])}</figcaption>` : ''}</figure>`); continue; }
    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph(); flushList();
      const level = Math.min(heading[1].length + 1, 4);
      html.push(`<h${level}>${renderInlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    if (trimmed.startsWith('>')) {
      flushParagraph(); flushList();
      html.push(`<blockquote>${renderInlineMarkdown(trimmed.replace(/^>\s*/, ''))}</blockquote>`);
      continue;
    }
    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) { flushParagraph(); list.push(bullet[1]); continue; }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  return html.join('');
}

function renderPostContent(content) {
  if (!content) return '';
  if (typeof content === 'string') return renderMarkdown(content);
  if (!Array.isArray(content)) return '';

  return content.map(block => {
    if (!block) return '';
    const type = block.type || 'paragraph';
    const text = block.text || '';
    const level = Math.min(Math.max(Number(block.level || 2), 2), 4);

    if (type === 'heading') return `<h${level}>${renderInlineMarkdown(text)}</h${level}>`;
    if (type === 'quote') return `<blockquote>${renderInlineMarkdown(text)}</blockquote>`;
    if (type === 'list') return `<ul>${(block.items || []).map(item => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ul>`;
    if (type === 'orderedList') return `<ol>${(block.items || []).map(item => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</ol>`;
    if (type === 'image') {
      const src = safeUrl(block.src || block.url);
      if (!src) return '';
      const alt = block.alt || block.caption || '';
      return `<figure><img src="${esc(src)}" alt="${esc(alt)}">${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}</figure>`;
    }
    if (type === 'html') return String(block.html || '');
    if (type === 'hr') return '<hr>';
    return renderSmartParagraph(text);
  }).join('');
}

function blogCard(post) {
  const category = getBlogCategory(post.category);
  const cover = safeUrl(post.cover || 'assets/images/logo.png') || 'assets/images/logo.png';
  return `
    <article class="blog-card">
      <a class="blog-card-link" href="#/post/${esc(post.slug)}">
        <div class="blog-thumb">
          <img src="${esc(cover)}" alt="${esc(post.title)} kapak görseli" loading="lazy">
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

    ${renderUpdatesFeed(6)}

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
              <h3>AltLibrary’den</h3>
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
  clearInterval(homeHeroTimer);

  const posts = getSortedBlogPosts();
  const categories = getDynamicBlogCategories();
  const tags = getBlogTags();
  const suggested = getFeaturedBlogPosts(5);

  app.innerHTML = `
    <section class="altlibrary-hero">
      <div class="altlibrary-hero-copy">
        <div class="kicker">AltLibrary</div>
        <h1>AltDünya yazı arşivi, karakter dosyaları ve geek kültürü kütüphanesi.</h1>
        <p>Eski AltDünya yazıları, Kahraman Kimlikleri, çizgi roman dosyaları, oyun kültürü, nostalji ve arşiv içerikleri burada toplanır.</p>
        <div class="cta-row">
          <a class="primary-btn" href="#library-all">Tüm Yazılar</a>
          <a class="secondary-btn" href="#library-categories">Kategoriler</a>
        </div>
      </div>
      <div class="altlibrary-stats">
        <div><strong>${posts.length}</strong><span>Yazı</span></div>
        <div><strong>${categories.length}</strong><span>Kategori</span></div>
        <div><strong>${tags.length}</strong><span>Etiket / Segment</span></div>
      </div>
    </section>

    <section class="section library-suggested">
      <div class="section-head">
        <div>
          <h2>Sizin İçin Önerilenler</h2>
          <p class="muted">Arşivden rastgele seçilmiş birkaç dosya.</p>
        </div>
      </div>
      <div class="library-compact-grid">${suggested.map(blogCard).join('') || '<div class="search-empty">Henüz yazı yok.</div>'}</div>
    </section>

    <section class="section" id="library-categories">
      <div class="section-head">
        <div>
          <h2>Kategoriler</h2>
          <p class="muted">Kategoriler blog.json içindeki yazılardan otomatik oluşur.</p>
        </div>
      </div>
      <div class="library-category-grid">
        ${categories.map(cat => `
          <a class="library-category-card" href="#/library-category/${esc(cat.id)}">
            <div class="library-category-count">${cat.count || 0}</div>
            <h3>${esc(cat.name || cat.id)}</h3>
            <p>${esc(cat.description || 'Bu kategoriye ait yazılar.')}</p>
          </a>
        `).join('') || '<div class="search-empty">Henüz kategori yok.</div>'}
      </div>
    </section>

    <section class="section" id="library-all">
      <div class="section-head">
        <div>
          <h2>Tüm Yazılar</h2>
          <p class="muted">Yazıları kategori, segment/etiket veya arama ile filtreleyebilirsin.</p>
        </div>
      </div>

      <div class="library-filter-panel">
        <input id="librarySearchInput" class="library-filter-input" type="search" placeholder="Yazı ara..." autocomplete="off">
        <select id="libraryCategoryFilter" class="library-filter-select">
          <option value="">Tüm kategoriler</option>
          ${categories.map(cat => `<option value="${esc(cat.id)}">${esc(cat.name || cat.id)}</option>`).join('')}
        </select>
        <select id="libraryTagFilter" class="library-filter-select">
          <option value="">Tüm segment/etiketler</option>
          ${tags.map(tag => `<option value="${esc(tag.name)}">${esc(tag.name)} (${tag.count})</option>`).join('')}
        </select>
      </div>

      <div id="libraryAllPosts" class="library-list"></div>
    </section>
  `;

  bindLibraryFilters(posts);
}

function bindLibraryFilters(posts) {
  const searchInput = document.getElementById('librarySearchInput');
  const categoryFilter = document.getElementById('libraryCategoryFilter');
  const tagFilter = document.getElementById('libraryTagFilter');
  const list = document.getElementById('libraryAllPosts');
  if (!list) return;

  const render = () => {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const cat = categoryFilter?.value || '';
    const tag = tagFilter?.value || '';

    const filtered = posts.filter(post => {
      const haystack = [post.title, post.excerpt, post.segment, post.category, ...(Array.isArray(post.tags) ? post.tags : [])].join(' ').toLowerCase();
      const postTags = [
        post.segment,
        ...(Array.isArray(post.tags) ? post.tags : []),
        ...(typeof post.tags === 'string' ? post.tags.split(',') : [])
      ].filter(Boolean).map(v => String(v).trim());

      return (!q || haystack.includes(q))
        && (!cat || post.category === cat)
        && (!tag || postTags.includes(tag));
    });

    list.innerHTML = filtered.map(post => {
      const category = getBlogCategory(post.category);
      return `
        <a class="library-row" href="#/post/${esc(post.slug)}">
          <img src="${esc(getBlogCover(post))}" alt="${esc(post.title)}">
          <div>
            <div class="library-row-meta">${esc(post.segment || category.name || 'Yazı')} · ${esc(post.date || 'Arşiv')}</div>
            <h3>${esc(post.title)}</h3>
            <p>${esc(post.excerpt || '')}</p>
          </div>
        </a>
      `;
    }).join('') || '<div class="search-empty">Bu filtreye uygun yazı bulunamadı.</div>';
  };

  [searchInput, categoryFilter, tagFilter].forEach(el => el?.addEventListener('input', render));
  [categoryFilter, tagFilter].forEach(el => el?.addEventListener('change', render));
  render();
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
      <div class="breadcrumb"><a href="#/website">AltLibrary</a> / ${esc(category.name)} / Toplam ${posts.length} yazı</div>
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
        ${post.cover ? `<figure class="blog-post-cover"><img src="${esc(safeUrl(post.cover) || post.cover)}" alt="${esc(post.title)} kapak görseli"></figure>` : ''}
        <div class="blog-post-hero-copy">
          <div class="kicker">${esc(category.name || 'AltDünya Website')}</div>
          <h1>${esc(post.title)}</h1>
          <p>${esc(post.excerpt || '')}</p>
          <div class="hero-badges">
            <span class="badge">${esc(post.segment || category.name || 'Yazı')}</span>
            <span class="badge">${esc(post.date || 'Arşiv')}</span>
            ${post.sourceUrl ? `<a class="badge subtle-badge" href="${esc(post.sourceUrl)}" target="_blank" rel="noopener noreferrer">Wayback Kaynağı</a>` : ''}
          </div>
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
              ${blogData.categories.map(cat => `<a href="#/library-category/${esc(cat.id)}">${esc(cat.name)}</a>`).join('')}
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
