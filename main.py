# ============================================================
#  main.py  —  punto di partenza dell'intera applicazione
#  Esegui questo file da PyCharm per avviare tutto
# ============================================================

import uvicorn                          # server web
from fastapi import FastAPI             # framework backend
from fastapi.staticfiles import StaticFiles
from apscheduler.schedulers.background import BackgroundScheduler  # scheduler

# ── importa i tuoi moduli ──────────────────────────────────
from backend.kpi        import calcola_kpi
from backend.tickets    import sincronizza_remedy
from backend.presenze   import router as presenze_router
from backend.confluence import aggiorna_guide
from backend.routes     import router as api_router
from ai.indexer         import reindicizza_tutto
from database.models    import crea_tabelle


# ── crea l'app ────────────────────────────────────────────
app = FastAPI(title="Fastweb Ops Dashboard")


# ── collega tutte le sezioni dell'API ─────────────────────
app.include_router(api_router,      prefix="/api")
app.include_router(presenze_router, prefix="/api/presenze")


# ── servi il frontend React come file statici ─────────────
app.mount("/", StaticFiles(directory="frontend/build", html=True), name="frontend")


# ── scheduler: cosa fare ogni ora ─────────────────────────
scheduler = BackgroundScheduler()

scheduler.add_job(
    sincronizza_remedy,         # legge nuovi ticket da Remedy
    trigger="interval",
    hours=1,
    id="sync_remedy"
)

scheduler.add_job(
    calcola_kpi,                # ricalcola KPI di tutto il team
    trigger="interval",
    hours=1,
    id="refresh_kpi"
)

scheduler.add_job(
    aggiorna_guide,             # scarica guide aggiornate da Confluence
    trigger="interval",
    hours=6,                    # guide cambiano meno spesso
    id="sync_confluence"
)

scheduler.add_job(
    reindicizza_tutto,          # aggiorna la memoria dell'AI con i nuovi dati
    trigger="interval",
    hours=2,
    id="reindex_ai"
)


# ── all'avvio: esegui subito senza aspettare la prima ora ──
@app.on_event("startup")
async def avvia():
    print("🚀 Fastweb Ops Dashboard partita")

    # 1. crea le tabelle nel DB se non esistono
    crea_tabelle()
    print("✅ Database pronto")

    # 2. prima sincronizzazione immediata
    sincronizza_remedy()
    print("✅ Ticket Remedy sincronizzati")

    calcola_kpi()
    print("✅ KPI calcolati")

    aggiorna_guide()
    print("✅ Guide Confluence aggiornate")

    reindicizza_tutto()
    print("✅ AI indicizzata e pronta")

    # 3. avvia lo scheduler in background
    scheduler.start()
    print("⏰ Scheduler attivo — refresh automatico ogni ora")


# ── allo spegnimento: ferma lo scheduler pulito ────────────
@app.on_event("shutdown")
async def spegni():
    scheduler.shutdown()
    print("🛑 Dashboard spenta correttamente")


# ── avvia il server ───────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",    # accessibile da tutta la LAN (anche i colleghi)
        port=8000,
        reload=True        # ricarica automaticamente se modifichi il codice
    )

# ── per avviare: apri il terminale PyCharm e scrivi ────────
#    python main.py
#
#  poi apri nel browser (o telefono sulla stessa VPN):
#    http://localhost:8000         (tuo PC)
#    http://192.168.x.x:8000      (colleghi in LAN)
# ============================================================

###ciao ciao ciao##