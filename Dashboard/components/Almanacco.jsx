// ============================================================
//  components/Almanacco.jsx  —  pagina knowledge base
//  Lista guide con ricerca live
//  In futuro: contenuto reale da Confluence API
// ============================================================


function Almanacco() {

  // ── renderizza le guide al caricamento ──────────────────
  React.useEffect(() => {
    renderizzaGuide(MOCK_DATA.guide);
  }, []);


  return (
    <div className="page" id="page-almanacco">

      {/* ── HEADER ── */}
      <div className="header">
        <div className="header-left">
          <div className="logo">Almanacco</div>
          <div className="logo-sub">{MOCK_DATA.guide.length} guide disponibili</div>
        </div>
        <div className="avatar">RM</div>
      </div>

      {/* ── SALUTO ── */}
      <div className="greeting">
        <h1>Knowledge <span className="accent">Base</span></h1>
        <div className="subtitle">
          Guide operative del progetto Fastweb.
        </div>
      </div>

      {/* ── RICERCA ── */}
      <div className="section-label">Cerca</div>
      <input
        className="search-input"
        id="ricerca-guide"
        placeholder="🔍  Cerca una guida…"
        onInput={filtraGuide}
      />

      {/* ── LISTA GUIDE ── */}
      <div className="section-label">
        Guide (<span id="count-guide">{MOCK_DATA.guide.length}</span>)
      </div>
      <div className="card" id="lista-guide">
        {/* le guide vengono inserite da renderizzaGuide() */}
      </div>

      {/* ── CATEGORIE ── */}
      <div className="section-label">Filtra per categoria</div>
      <div style={{ padding: "0 16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["Tutti","Remedy","ETL","Oracle","CAPAM","Informatica","Rete"].map((cat, i) => (
          <div
            key={i}
            className={`tag ${i === 0 ? "blue" : "gray"}`}
            id={`filtro-${cat.toLowerCase()}`}
            style={{ cursor: "pointer", padding: "6px 14px", fontSize: "13px" }}
            onClick={() => filtraPerCategoria(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="spacer"></div>
      <div className="spacer"></div>

    </div>
  );
}


// ── renderizza le guide nella lista ─────────────────────────
function renderizzaGuide(guide) {
  const lista = document.getElementById("lista-guide");
  const count = document.getElementById("count-guide");

  if (!lista) return;

  lista.innerHTML = "";

  if (guide.length === 0) {
    lista.innerHTML = `<div class="no-results">Nessuna guida trovata.</div>`;
    if (count) count.textContent = 0;
    return;
  }

  guide.forEach((g, i) => {
    const riga = document.createElement("div");
    riga.className = "card-row";
    riga.style.cursor = "pointer";

    riga.innerHTML = `
      <div class="guide-icon">${g.icona}</div>
      <div class="flex-1">
        <div class="guide-title">${g.titolo}</div>
        <div class="guide-sub">${g.sotto}</div>
      </div>
      <div class="tag gray" style="font-size:10px">${g.categoria}</div>
      <div class="guide-arrow">›</div>
    `;

    // click sulla guida → apre il dettaglio
    // IN FUTURO: aprirà il contenuto reale da Confluence
    riga.addEventListener("click", () => apriGuida(g));

    lista.appendChild(riga);
  });

  if (count) count.textContent = guide.length;
}


// ── filtra le guide in base al testo cercato ────────────────
function filtraGuide() {
  const input   = document.getElementById("ricerca-guide");
  const testo   = input.value.toLowerCase().trim();
  const filtrate = MOCK_DATA.guide.filter(g =>
    g.titolo.toLowerCase().includes(testo) ||
    g.sotto.toLowerCase().includes(testo)  ||
    g.categoria.toLowerCase().includes(testo)
  );
  renderizzaGuide(filtrate);
}


// ── filtra per categoria ─────────────────────────────────────
function filtraPerCategoria(categoria) {
  // aggiorna stile bottoni
  ["tutti","remedy","etl","oracle","capam","informatica","rete"].forEach(cat => {
    const btn = document.getElementById(`filtro-${cat}`);
    if (btn) {
      btn.className = "tag gray";
      btn.style.cssText = "cursor:pointer;padding:6px 14px;font-size:13px";
    }
  });

  const btnAttivo = document.getElementById(`filtro-${categoria.toLowerCase()}`);
  if (btnAttivo) {
    btnAttivo.className = "tag blue";
    btnAttivo.style.cssText = "cursor:pointer;padding:6px 14px;font-size:13px";
  }

  // filtra
  if (categoria === "Tutti") {
    renderizzaGuide(MOCK_DATA.guide);
  } else {
    const filtrate = MOCK_DATA.guide.filter(g => g.categoria === categoria);
    renderizzaGuide(filtrate);
  }

  // svuota la ricerca
  const input = document.getElementById("ricerca-guide");
  if (input) input.value = "";
}


// ── apre il dettaglio di una guida ──────────────────────────
function apriGuida(guida) {
  // per ora mostra un alert con il contenuto
  // IN FUTURO: aprirà una modale o una pagina dedicata
  alert(`${guida.icona} ${guida.titolo}\n\n${guida.contenuto}`);
}
