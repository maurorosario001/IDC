// ============================================================
//  components/Home.jsx  —  pagina principale
//  Contiene: KPI, progressi team, ultimi ticket
// ============================================================


function Home() {

  // ── anima i numeri KPI all'apertura ─────────────────────
  React.useEffect(() => {
    animaNumeri();
    animaProgressBar();
  }, []);


  return (
    <div className="page active" id="page-home">

      {/* ── HEADER ── */}
      <div className="header">
        <div className="header-left">
          <div className="logo">Fastweb Ops</div>
          <div className="logo-sub" id="data-oggi"></div>
        </div>
        <div className="avatar">RM</div>
      </div>

      {/* ── SALUTO ── */}
      <div className="greeting">
        <h1>
          Ciao, <span className="accent">{MOCK_DATA.utente.nome}</span> 👋
        </h1>
        <div className="subtitle">
          Hai {MOCK_DATA.kpi.ticket_aperti} ticket aperti oggi.
        </div>
      </div>

      {/* ── KPI ── */}
      <div className="section-label">Panoramica</div>
      <div className="kpi-grid">

        <div className="kpi-card">
          <div className="kpi-label">Ticket chiusi</div>
          <div className="kpi-value blue" data-target={MOCK_DATA.kpi.ticket_chiusi}>0</div>
          <div className="kpi-delta">↑ {MOCK_DATA.kpi.delta_chiusi}</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Score KPI</div>
          <div className="kpi-value green" data-target={MOCK_DATA.kpi.score_kpi} data-suffix="%">0</div>
          <div className="kpi-delta">Target: 80%</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Peso medio</div>
          <div className="kpi-value orange">3.2</div>
          <div className="kpi-delta orange">scala 1–5</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Aperti</div>
          <div className="kpi-value red" data-target={MOCK_DATA.kpi.ticket_aperti}>0</div>
          <div className="kpi-delta red">↑ {MOCK_DATA.kpi.delta_aperti}</div>
        </div>

      </div>

      {/* ── PROGRESSI TEAM ── */}
      <div className="section-label">Team India</div>
      <div className="card">
        <div className="card-inner">
          {MOCK_DATA.team.map((membro, i) => (
            <div className="prog-row" key={i}>
              <div className="prog-name">{membro.nome}</div>
              <div className="prog-track">
                <div
                  className="prog-fill"
                  data-width={membro.pct}
                  style={{ width: "0%" }}
                />
              </div>
              <div className="prog-pct">{membro.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ULTIMI TICKET ── */}
      <div className="section-label">Ultimi ticket</div>
      <div className="card">
        {MOCK_DATA.tickets.map((t, i) => (
          <div className="card-row" key={i}>
            <div className={`ticket-dot ${t.stato}`}></div>
            <div className="flex-1">
              <div className="ticket-id">{t.id}</div>
              <div className="ticket-title">{t.titolo}</div>
              <div className="ticket-meta">{t.data} · {t.utente}</div>
            </div>
            <div className="tag blue">★ {t.peso}</div>
          </div>
        ))}
      </div>

      <div className="spacer"></div>

    </div>
  );
}


// ── imposta la data di oggi nell'header ──────────────────────
function impostaData() {
  const giorni   = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];
  const mesi     = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
  const oggi     = new Date();
  const testo    = `${giorni[oggi.getDay()]}, ${oggi.getDate()} ${mesi[oggi.getMonth()]} ${oggi.getFullYear()}`;
  const el       = document.getElementById("data-oggi");
  if (el) el.textContent = testo;
}


// ── anima i numeri KPI da 0 al valore reale ─────────────────
function animaNumeri() {
  const elementi = document.querySelectorAll(".kpi-value[data-target]");
  elementi.forEach(el => {
    const target  = parseInt(el.getAttribute("data-target"));
    const suffix  = el.getAttribute("data-suffix") || "";
    const durata  = 900;
    const step    = Math.ceil(target / (durata / 16));
    let   current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}


// ── anima le barre progresso ─────────────────────────────────
function animaProgressBar() {
  const barre = document.querySelectorAll(".prog-fill[data-width]");
  // piccolo delay per far partire l'animazione CSS
  setTimeout(() => {
    barre.forEach(barra => {
      const larghezza = barra.getAttribute("data-width");
      barra.style.width = larghezza + "%";
    });
  }, 100);
}


// ── chiama impostaData quando la pagina home è visibile ──────
document.addEventListener("DOMContentLoaded", () => {
  impostaData();
});
