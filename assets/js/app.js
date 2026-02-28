(function(){
  const ITEMS = (window.ALT_ITEMS || []);
  function esc(s){return String(s).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
  function matches(item, term){
    const t = term.toLowerCase().trim();
    if(!t) return true;
    const hay = [item.title,item.desc,(item.tags||[]).join(" ")].join(" ").toLowerCase();
    return hay.includes(t);
  }
  function scopeOK(item, sc){ return sc==="all" ? true : item.type===sc; }

  // Index global search
  const q = document.getElementById("q");
  const scope = document.getElementById("scope");
  const results = document.getElementById("results");
  const list = document.getElementById("list");
  const count = document.getElementById("count");
  const latest = document.getElementById("latest");

  function renderResults(term, sc){
    if(!results) return;
    const termTrim = (term||"").trim();
    if(!termTrim){
      results.style.display="none";
      list && (list.innerHTML="");
      count && (count.textContent="");
      return;
    }
    const found = ITEMS.filter(it=>scopeOK(it, sc)).filter(it=>matches(it, termTrim)).slice(0,12);
    results.style.display="block";
    if(count) count.textContent = `${found.length} sonuç`;
    if(list){
      list.innerHTML = found.length ? found.map(it=>{
        const typeLabel = it.type==="free"?"Freeware":it.type==="openbor"?"OpenBOR":"Originals";
        return `
          <div class="row">
            <div class="rowLeft">
              <p class="rowTitle">${esc(it.title)}</p>
              <p class="rowDesc">${esc(it.desc)}</p>
            </div>
            <div class="rowRight">
              <span class="chip">${esc(typeLabel)}</span>
              ${it.version?`<span class="chip">${esc(it.version)}</span>`:""}
              <a class="btn primary" href="${esc(it.url)}">Sayfaya Git →</a>
            </div>
          </div>`;
      }).join("") : `<div class="muted">Sonuç bulunamadı.</div>`;
    }
  }

  function renderLatest(){
    if(!latest) return;
    const sorted = [...ITEMS].sort((a,b)=>String(b.added).localeCompare(String(a.added)));
    const top = sorted.slice(0,3);
    latest.innerHTML = top.map(it=>{
      const typeLabel = it.type==="free"?"Freeware/Abandonware":it.type==="openbor"?"OpenBOR":"Originals";
      const tags = (it.tags||[]).slice(0,3).map(t=>`<span class="tag">${esc(t)}</span>`).join("");
      return `
        <a class="mini" href="${esc(it.url)}">
          <p class="title">${esc(it.title)}</p>
          <p class="meta">${esc(typeLabel)} • ${esc(it.added)} • ${esc(it.version||"")}</p>
          <div class="tags">${tags}</div>
        </a>`;
    }).join("");
  }

  if(q){
    q.addEventListener("input", ()=>renderResults(q.value, (scope && scope.value)||"all"));
  }
  if(scope){
    scope.addEventListener("change", ()=>renderResults((q&&q.value)||"", scope.value));
  }

  renderLatest();

  // Category page filtering
  const cq = document.getElementById("catq");
  const cgrid = document.getElementById("catgrid");
  const ctype = document.body.getAttribute("data-category");
  const featuredId = document.body.getAttribute("data-featured-id");
  if(cq && cgrid && ctype){
    let catItems = ITEMS.filter(it=>it.type===ctype);
    if(featuredId){ catItems = catItems.filter(it=>it.id!==featuredId); }
    const renderCat = (term)=>{
      const t = (term||"").trim();
      const filtered = catItems.filter(it=>matches(it, t));
      cgrid.innerHTML = filtered.length ? filtered.map(it=>{
        const tags = (it.tags||[]).slice(0,3).map(x=>`<span class="tag">${esc(x)}</span>`).join("");
        return `
        <a class="card" href="../${esc(it.url)}">
          <div class="thumb"><img src="../${esc(it.thumb)}" alt="${esc(it.title)}"/></div>
          <p class="kicker">${esc(ctype.toUpperCase())}</p>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.desc)}</p>
          <div class="ctaRow">
            <span class="btn primary">Sayfaya Git →</span>
            ${tags}
          </div>
        </a>`;
      }).join("") : `<div class="muted">Sonuç bulunamadı.</div>`;
    };
    cq.addEventListener("input", ()=>renderCat(cq.value));
    renderCat("");
  }
})();
