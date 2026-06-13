// ============================================================
//  data/mock.js  —  dati finti per ora
//  Quando il backend sarà pronto, questo file non servirà più
// ============================================================

const MOCK_DATA = {

  // ── utente loggato ────────────────────────────────────
  utente: {
    nome:    "Rosario",
    cognome: "Mauro",
    ruolo:   "Operation Data Analyst",
    iniziali: "RM",
  },

  // ── kpi principali ────────────────────────────────────
  kpi: {
    ticket_chiusi:   24,
    score_kpi:       87,
    peso_medio:      3.2,
    ticket_aperti:   5,
    delta_chiusi:    "+3 questa settimana",
    delta_aperti:    "2 in scadenza oggi",
  },

  // ── team india ────────────────────────────────────────
  team: [
    { nome: "Rajesh", pct: 87, ticket: 24, peso: 4.1 },
    { nome: "Priya",  pct: 72, ticket: 18, peso: 3.4 },
    { nome: "Amit",   pct: 61, ticket: 14, peso: 2.9 },
    { nome: "Sneha",  pct: 45, ticket: 9,  peso: 2.1 },
  ],

  // ── ultimi ticket ─────────────────────────────────────
  tickets: [
    {
      id:       "INC-004821",
      titolo:   "ETL PowerCenter – job bloccato",
      utente:   "Rajesh",
      data:     "Oggi 09:14",
      peso:     4,
      stato:    "aperto",
      categoria:"ETL",
      soluzione: ""
    },
    {
      id:       "INC-004798",
      titolo:   "Oracle ORA-01555 snapshot too old",
      utente:   "Priya",
      data:     "Ieri 16:40",
      peso:     3,
      stato:    "aperto",
      categoria:"Oracle",
      soluzione: ""
    },
    {
      id:       "INC-004775",
      titolo:   "Script CAPAM – permessi negati",
      utente:   "Amit",
      data:     "9 Giu",
      peso:     2,
      stato:    "chiuso",
      categoria:"CAPAM",
      soluzione: "Aggiornati i permessi unix sulla macchina target"
    },
    {
      id:       "INC-004760",
      titolo:   "Informatica Cloud – agent offline",
      utente:   "Sneha",
      data:     "8 Giu",
      peso:     5,
      stato:    "chiuso",
      categoria:"Informatica",
      soluzione: "Riavviato il servizio agent e verificata la connessione VPN"
    },
    {
      id:       "INC-004741",
      titolo:   "Remedy – duplicate incident merge",
      utente:   "Rosario",
      data:     "7 Giu",
      peso:     2,
      stato:    "chiuso",
      categoria:"Remedy",
      soluzione: "Unificati i ticket duplicati tramite console amministrativa"
    },
  ],

  // ── guide almanacco ───────────────────────────────────
  guide: [
    {
      id: 1,
      icona:    "📋",
      titolo:   "Gestione Ticket Remedy",
      sotto:    "Apertura, escalation, chiusura",
      categoria:"Remedy",
      contenuto:"Come aprire un ticket, assegnarlo, escalare e chiuderlo correttamente."
    },
    {
      id: 2,
      icona:    "🔄",
      titolo:   "ETL PowerCenter – Troubleshooting",
      sotto:    "Job falliti, log, sessioni bloccate",
      categoria:"ETL",
      contenuto:"Come analizzare i log di PowerCenter, identificare sessioni bloccate e rilanciarle."
    },
    {
      id: 3,
      icona:    "🗄️",
      titolo:   "Oracle SQL – Errori comuni",
      sotto:    "ORA-*, spazio, permessi, rollback",
      categoria:"Oracle",
      contenuto:"Guida agli errori Oracle più frequenti e come risolverli."
    },
    {
      id: 4,
      icona:    "🖥️",
      titolo:   "CAPAM – Accesso Unix",
      sotto:    "Connessione macchine, script shell",
      categoria:"CAPAM",
      contenuto:"Come connettersi alle macchine Unix tramite CAPAM ed eseguire script."
    },
    {
      id: 5,
      icona:    "☁️",
      titolo:   "Informatica Cloud – Setup",
      sotto:    "Configurazione agent, connettori",
      categoria:"Informatica",
      contenuto:"Guida alla configurazione dell'agent Informatica Cloud e dei connettori."
    },
    {
      id: 6,
      icona:    "📡",
      titolo:   "VPN & Accessi",
      sotto:    "Connessione, troubleshooting rete",
      categoria:"Rete",
      contenuto:"Come connettersi alla VPN aziendale e risolvere i problemi di accesso."
    },
  ],

  // ── risposte mock per l'AI agent ─────────────────────
  ai_risposte: [
    "Ho analizzato 287 ticket simili. L'errore più frequente per job ETL bloccati è un lock Oracle attivo. Controlla la vista V$LOCK e cerca sessioni con STATUS='INACTIVE' da più di 30 minuti.",
    "Dalla knowledge base: ORA-01555 indica undo segment insufficiente. Soluzione più usata (82% dei casi): aumentare UNDO_RETENTION a 3600 e verificare l'AUTOEXTEND del tablespace UNDOTBS.",
    "Ho trovato 14 ticket risolti con questa tipologia. Il pattern vincente è: riavvio servizio Informatica → verifica log pmcmd → rilancio sessione con override parametri di connessione.",
    "Proposta nuova: puoi automatizzare questo check con uno script Python che interroga Remedy ogni ora e aggiorna un log centralizzato. Vuoi che ti mostri la struttura base?",
  ],

};