// ============================================================
//  components/Presenze.jsx  —  pagina calendario presenze
//  Tocca un giorno: presente (verde) → assente (rosso) → reset
// ============================================================


function Presenze() {

  // ── costruisce il calendario al caricamento ──────────────
  React.useEffect(() => {
    costruisciCalendario();
  }, []);


  return (
    <div className="page" id="page-presenze">

      {/* ── HEADER ── */}
      <div className="header">
        <div className="header-left">
          <div className="logo">Presenze</div>
          <div className="logo-sub" id="mese-anno"></div>
        </div>
        <div className="avatar">RM</div>
      </div>

      {/* ── SALUTO ── */}
      <div className="greeting">
        <h1>Calendario</h1>
        <div className="subtitle">
          Tocca un giorno per segnare presenza o assenza.
        </div>
      </div>

      {/* ── CALENDARIO ── */}
      <div className="section-label">Giugno 2025</div>
      <div className="card">
        <div className="card-inner">

          {/* nomi giorni settimana */}
          <div className="cal-grid" style={{ marginBottom: "8px" }}>
            {["L","M","M","G","V","S","D"].map((g, i) => (
              <div className="cal-day-name" key={i}>{g}</div>
            ))}
          </div>

          {/* giorni del mese — generati da JS */}
          <div className="cal-grid" id="cal-giorni"></div>

        </div>
      </div>

      {/* ── RIEPILOGO MESE ── */}
      <div className="section-label">Riepilogo mese</div>
      <div className="kpi-grid">

        <div className="kpi-card">
          <div className="kpi-label">Presenze</div>
          <div className="kpi-value green" id="count-presenze">0</div>
          <div className="kpi-delta">giorni confermati</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Assenze</div>
          <div className="kpi-value red" id="count-assenze">0</div>
          <div className="kpi-delta red">giorni assenti</div>
        </div>

      </div>

      {/* ── LEGENDA ── */}
      <div className="section-label">Legenda</div>
      <div className="card">
        <div className="card-inner" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "rgba(48,209,88,0.2)", border: "1.5px solid var(--green)" }}></div>
            Presente
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "4px", background: "rgba(255,69,58,0.2)", border: "1.5px solid var(--red)" }}></div>
            Assente
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "4px", border: "1.5px solid var(--blue)" }}></div>
            Oggi
          </div>

        </div>
      </div>

      <div className="spacer"></div>

    </div>
  );
}


// ── costruisce i giorni del calendario ───────────────────────
function costruisciCalendario() {
  const oggi        = new Date();
  const anno        = oggi.getFullYear();
  const mese        = oggi.getMonth();
  const primoGiorno = new Date(anno, mese, 1).getDay();
  const giorniMese  = new Date(anno, mese + 1, 0).getDate();

  // lunedì = 0, domenica = 6
  const offset = primoGiorno === 0 ? 6 : primoGiorno - 1;

  const griglia  = document.getElementById("cal-giorni");
  const meseAnno = document.getElementById("mese-anno");

  if (!griglia) return;

  // imposta mese e anno nell'header
  const nomiMesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno",
                    "Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
  if (meseAnno) meseAnno.textContent = `${nomiMesi[mese]} ${anno}`;

  // stati dei giorni: undefined = neutro, "presente", "assente"
  const stati = {};

  // celle vuote per offset
  for (let i = 0; i < offset; i++) {
    const vuota = document.createElement("div");
    vuota.className = "cal-day empty";
    griglia.appendChild(vuota);
  }

  // celle giorni
  for (let g = 1; g <= giorniMese; g++) {
    const cella = document.createElement("div");
    cella.className = "cal-day";
    cella.textContent = g;

    // evidenzia oggi
    if (g === oggi.getDate()) {
      cella.classList.add("oggi");
    }

    // click: cicla tra presente → assente → neutro
    cella.addEventListener("click", () => {
      const statoCorrente = stati[g];

      if (!statoCorrente) {
        stati[g] = "presente";
        cella.classList.remove("assente");
        cella.classList.add("presente");
      } else if (statoCorrente === "presente") {
        stati[g] = "assente";
        cella.classList.remove("presente");
        cella.classList.add("assente");
      } else {
        stati[g] = undefined;
        cella.classList.remove("presente", "assente");
      }

      aggiornaContatori(stati);
    });

    griglia.appendChild(cella);
  }
}


// ── aggiorna i contatori presenze/assenze ────────────────────
function aggiornaContatori(stati) {
  const presenze = Object.values(stati).filter(v => v === "presente").length;
  const assenze  = Object.values(stati).filter(v => v === "assente").length;

  const elPresenze = document.getElementById("count-presenze");
  const elAssenze  = document.getElementById("count-assenze");

  if (elPresenze) elPresenze.textContent = presenze;
  if (elAssenze)  elAssenze.textContent  = assenze;
}
