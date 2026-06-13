// ============================================================
//  components/Agent.jsx  —  pagina AI Agent
//  Chat con l'agente intelligente
//  Per ora usa risposte mock — poi si collega a Claude API
// ============================================================


function Agent() {

  // ── inizializza la chat al caricamento ──────────────────
  React.useEffect(() => {
    scrollChatInFondo();
  }, []);


  return (
    <div className="page" id="page-agent">

      {/* ── HEADER ── */}
      <div className="header">
        <div className="header-left">
          <div className="logo">AI Agent</div>
          <div className="logo-sub">Connesso alla knowledge base</div>
        </div>
        {/* indicatore stato online */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div className="ai-status-dot"></div>
          <span style={{ fontSize: "12px", color: "var(--green)", fontWeight: "500" }}>Online</span>
        </div>
      </div>

      {/* ── SALUTO ── */}
      <div className="greeting">
        <h1>Ops <span className="accent">Agent</span></h1>
        <div className="subtitle">
          Ragiona su ticket, guide ed errori.
        </div>
      </div>

      {/* ── CHAT ── */}
      <div className="section-label">Conversazione</div>
      <div className="ai-wrap">

        {/* header chat */}
        <div className="ai-header">
          <div className="ai-status-dot"></div>
          <span className="ai-status-text">Agente · knowledge base attiva</span>
        </div>

        {/* messaggi */}
        <div className="ai-messages" id="ai-messaggi">
          <div className="msg ai">
            Ciao! Sono l'agente Fastweb Ops. Ho accesso a tutti i ticket Remedy,
            le guide Confluence e gli appunti del team. Come posso aiutarti?
          </div>
        </div>

        {/* input */}
        <div className="ai-input-row">
          <input
            className="ai-input"
            id="ai-input"
            placeholder="Chiedi qualcosa…"
            onKeyDown={gestisciInvio}
          />
          <button className="ai-send-btn" onClick={inviaMessaggio}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

      </div>

      {/* ── CATEGORIE RAPIDE ── */}
      <div className="section-label">Categorie più cercate</div>
      <div className="card">

        {[
          { icona: "🔄", titolo: "ETL PowerCenter",    sotto: "Job bloccati, sessioni, log" },
          { icona: "🗄️", titolo: "Oracle Errors",       sotto: "ORA-*, lock, spazio, rollback" },
          { icona: "🖥️", titolo: "Script CAPAM",        sotto: "Permessi, connessioni Unix" },
          { icona: "📋", titolo: "Remedy Ticket",       sotto: "Apertura, escalation, chiusura" },
          { icona: "☁️", titolo: "Informatica Cloud",   sotto: "Agent offline, connettori" },
        ].map((cat, i, arr) => (
          <div
            className="card-row"
            key={i}
            style={{ cursor: "pointer" }}
            onClick={() => cercaCategoria(cat.titolo)}
          >
            <div style={{ fontSize: "22px" }}>{cat.icona}</div>
            <div className="flex-1">
              <div className="guide-title">{cat.titolo}</div>
              <div className="guide-sub">{cat.sotto}</div>
            </div>
            <div className="guide-arrow">›</div>
          </div>
        ))}

      </div>

      <div className="spacer"></div>

    </div>
  );
}


// ── indice per ciclare le risposte mock ──────────────────────
let _rispostaIdx = 0;


// ── invia messaggio e mostra risposta AI ────────────────────
function inviaMessaggio() {
  const input     = document.getElementById("ai-input");
  const contenuto = document.getElementById("ai-messaggi");
  const testo     = input.value.trim();

  if (!testo) return;

  // aggiunge messaggio utente
  aggiungiMessaggio(testo, "user");
  input.value = "";

  // mostra "sta scrivendo…"
  const typing = aggiungiMessaggio("Sto analizzando…", "ai typing");

  // simula risposta dopo 1.1 secondi
  // ── IN FUTURO: qui chiameremo /api/agent/chiedi ──────────
  setTimeout(() => {
    typing.remove();
    const risposta = MOCK_DATA.ai_risposte[_rispostaIdx % MOCK_DATA.ai_risposte.length];
    _rispostaIdx++;
    aggiungiMessaggio(risposta, "ai");
  }, 1100);
}


// ── click su categoria rapida ────────────────────────────────
function cercaCategoria(nomeCategoria) {
  const input = document.getElementById("ai-input");
  if (input) {
    input.value = `Aiutami con: ${nomeCategoria}`;
    input.focus();
  }
}


// ── aggiunge un messaggio nella chat ────────────────────────
function aggiungiMessaggio(testo, tipo) {
  const contenuto = document.getElementById("ai-messaggi");
  const msg       = document.createElement("div");
  msg.className   = `msg ${tipo}`;
  msg.textContent = testo;
  contenuto.appendChild(msg);
  scrollChatInFondo();
  return msg;
}


// ── scrolla la chat in fondo ─────────────────────────────────
function scrollChatInFondo() {
  const contenuto = document.getElementById("ai-messaggi");
  if (contenuto) contenuto.scrollTop = contenuto.scrollHeight;
}


// ── invio con tasto Enter ────────────────────────────────────
function gestisciInvio(event) {
  if (event.key === "Enter") inviaMessaggio();
}
