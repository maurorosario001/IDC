// ============================================================
//  js/app.js  —  cuore dell'applicazione
//  Gestisce la navigazione tra le pagine e avvia tutto
// ============================================================


// ── pagina attiva al momento ─────────────────────────────────
let paginaAttiva = "home";


// ── quando la pagina HTML è pronta ──────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  // avvia la pagina home di default
  mostraPagina("home");

  // collega i bottoni della navigazione in basso
  collegaNavigazione();

  console.log("✅ Fastweb Ops Dashboard avviata");
});


// ── mostra una pagina e nasconde le altre ────────────────────
function mostraPagina(nomePagina) {

  // nasconde tutte le pagine
  const tutteLePagine = document.querySelectorAll(".page");
  tutteLePagine.forEach(pagina => {
    pagina.classList.remove("active");
  });

  // mostra solo quella richiesta
  const paginaDaMostrare = document.getElementById(`page-${nomePagina}`);
  if (paginaDaMostrare) {
    paginaDaMostrare.classList.add("active");
  }

  // aggiorna il bottone attivo nella navigazione
  aggiornaNavigation(nomePagina);

  // azioni specifiche per ogni pagina
  switch (nomePagina) {
    case "home":
      animaNumeri();
      animaProgressBar();
      impostaData();
      break;
    case "presenze":
      // ricostruisce il calendario solo se è vuoto
      const griglia = document.getElementById("cal-giorni");
      if (griglia && griglia.children.length === 0) {
        costruisciCalendario();
      }
      break;
    case "agent":
      scrollChatInFondo();
      break;
    case "almanacco":
      renderizzaGuide(MOCK_DATA.guide);
      break;
  }

  paginaAttiva = nomePagina;

  // torna in cima alla pagina
  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ── aggiorna lo stile dei bottoni navigazione ────────────────
function aggiornaNavigation(nomePagina) {
  const bottoni = document.querySelectorAll(".nav-item");
  bottoni.forEach(bottone => {
    bottone.classList.remove("active");
  });

  const bottoneAttivo = document.getElementById(`nav-${nomePagina}`);
  if (bottoneAttivo) {
    bottoneAttivo.classList.add("active");
  }
}


// ── collega i click sui bottoni della nav ────────────────────
function collegaNavigazione() {
  const mappaNavi = {
    "nav-home":      "home",
    "nav-presenze":  "presenze",
    "nav-agent":     "agent",
    "nav-almanacco": "almanacco",
    "nav-tickets":   "tickets",   // sezione futura inserimento ticket
  };

  Object.entries(mappaNavi).forEach(([idBottone, nomePagina]) => {
    const bottone = document.getElementById(idBottone);
    if (bottone) {
      bottone.addEventListener("click", () => mostraPagina(nomePagina));
    }
  });
}


// ── refresh automatico dei dati ogni ora ─────────────────────
// IN FUTURO: chiamerà il backend Python per dati aggiornati
function avviaRefreshAutomatico() {
  const UN_ORA = 60 * 60 * 1000; // millisecondi

  setInterval(() => {
    console.log("🔄 Refresh dati automatico...");

    // IN FUTURO: fetch("/api/kpi")        → aggiorna KPI
    // IN FUTURO: fetch("/api/tickets")    → aggiorna ticket
    // IN FUTURO: fetch("/api/guide")      → aggiorna guide

    // per ora ricarica solo se siamo sulla home
    if (paginaAttiva === "home") {
      animaNumeri();
      animaProgressBar();
    }

    console.log("✅ Dati aggiornati");
  }, UN_ORA);
}


// ── avvia il refresh automatico ──────────────────────────────
avviaRefreshAutomatico();