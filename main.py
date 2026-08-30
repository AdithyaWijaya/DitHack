import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from starlette.middleware.trustedhost import TrustedHostMiddleware
from backend.app.database import engine
from backend.app.models import Base
from backend.app.routers.admin_router import router as admin_router
from backend.app.routers.api_router import router as api_router
from backend.app.schemas import ProxyHeadersMiddleware
from backend.app.config import API_KEY, ADMIN_USER, ADMIN_PASS, BASE_DIR, TEST_TOKEN

if not API_KEY:
    raise ValueError("API_KEY belum diset!")

if not ADMIN_USER or not ADMIN_PASS:
    raise ValueError("ADMIN_USER / ADMIN_PASS belum diset!")

Base.metadata.create_all(bind=engine)

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

app.add_middleware(ProxyHeadersMiddleware)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=f"{BASE_DIR}/static"), name="static")

@app.get("/")
def root():
    return FileResponse(f"{BASE_DIR}/templates/api.html")

@app.get("/admin")
def admin_panel():
    return FileResponse(f"{BASE_DIR}/templates/admin.html")

@app.get("/favicon.ico")
def favicon():
    return FileResponse(f"{BASE_DIR}/static/favicon.ico")

@app.get("/icon")
def icon():
    return FileResponse(f"{BASE_DIR}/static/icodh.png")

@app.get("/status")
def status():
    try:
        headers = {"Authorization": f"Bearer {TEST_TOKEN}"}
        res = requests.get(
            "https://api-dithack.up.railway.app/quizizz?pin=03682057",
            headers=headers,
            timeout=20,
        )
        return {"ok": res.status_code == 200}
    except Exception:
        return {"ok": False}

app.include_router(admin_router)
app.include_router(api_router)