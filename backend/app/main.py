import os
from datetime import datetime, date, timedelta
from typing import Optional
import requests
import json
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from app.database import SessionLocal, engine
from app import models, schemas, crud
from app.models import License, CacheQuizizz, CacheKahoot, UsageLog, CheatNetworkAccount
from app.admin_router import router as admin_router

load_dotenv()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise ValueError("API_KEY belum diset!")
ADMIN_USER = os.getenv("ADMIN_USER")
ADMIN_PASS = os.getenv("ADMIN_PASS")
if not ADMIN_USER or not ADMIN_PASS:
    raise ValueError("ADMIN_USER / ADMIN_PASS belum diset!")

api_key_header = APIKeyHeader(name="x-api-key")

models.Base.metadata.create_all(bind=engine)


def verify_api_key(x_api_key: str = Depends(api_key_header)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")


def get_license_status(lic):
    expiry = lic.expired
    now = date.today()
    if not lic.active:
        return "TIDAK AKTIF"
    elif expiry <= now:
        return "EXPIRED"
    return "AKTIF"


app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

# ─── Include admin router ────────────────────────────────────────────────────
app.include_router(admin_router)


# ─── Middleware ──────────────────────────────────────────────────────────────

class ProxyHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.headers.get("x-forwarded-proto") == "https":
            request.scope["scheme"] = "https"
        response = await call_next(request)
        return response


app.add_middleware(ProxyHeadersMiddleware)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ─── Static routes ───────────────────────────────────────────────────────────

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

# ─── Public license check ────────────────────────────────────────────────────

@app.get("/check/{token}", response_model=schemas.LicenseResponse)
def check_token(
    token: str,
    request: Request,
    x_device_id: str = Header(None),
    db: Session = Depends(get_db),
):
    lic = crud.get_license(db, token)
    if not lic:
        raise HTTPException(status_code=404, detail="Token tidak valid")
    status = get_license_status(lic)
    if status == "AKTIF":
        ua = request.headers.get("user-agent", "")
        device_id, device_name = _extract_device_info(f"Bearer {token}", x_device_id, ua)
        _validate_and_bind_device(lic, device_id, device_name, db)

    return {
        "code": lic.code,
        "owner": lic.owner,
        "expired": lic.expired,
        "active": lic.active,
        "status": status,
    }


# ─── Device-binding helper ────────────────────────────────────────────────────

def _validate_and_bind_device(
    lic: License,
    device_id: str,
    device_name: str,
    db: Session,
) -> None:
    """
    Enforce 1-token-1-device policy.

    - Jika token belum pernah digunakan (device_id is None) → bind sekarang.
    - Jika token sudah ter-bind ke device_id yang sama → update last_seen, lanjut.
    - Jika token sudah ter-bind ke device_id BERBEDA → tolak dengan 409 CONFLICT.

    device_id  : string unik dari client (fingerprint / UUID disimpan di localStorage)
    device_name: User-Agent string pendek untuk info di admin
    """
    now = datetime.utcnow()

    if not lic.device_id:
        # Belum ter-bind → bind sekarang
        lic.device_id   = device_id
        lic.device_name = device_name
        lic.bound_at    = now
        lic.last_seen   = now
        db.commit()
        return

    if lic.device_id == device_id:
        # Device sama → update last_seen
        lic.last_seen = now
        db.commit()
        return

    # Device berbeda → tolak
    raise HTTPException(
        status_code=409,
        detail="Token sudah digunakan di perangkat lain. Hubungi admin untuk reset.",
    )


# ─── Logout endpoint (unbind device dari sisi client) ─────────────────────────

@app.post("/logout")
def logout_device(
    authorization: str = Header(None),
    x_device_id: str = Header(None),
    db: Session = Depends(get_db),
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.replace("Bearer ", "").strip()

    lic = crud.get_license(db, token)
    if not lic:
        raise HTTPException(status_code=404, detail="Token tidak valid")

    if not x_device_id:
        raise HTTPException(status_code=400, detail="Device ID diperlukan")

    if lic.device_id != x_device_id:
        raise HTTPException(status_code=403, detail="Device tidak cocok")

    # Unbind device
    lic.device_id = None
    lic.device_name = None
    lic.bound_at = None
    lic.last_seen = None

    db.commit()

    return {"msg": "Logout berhasil"}

# ─── Legacy admin API (keep for backward compat) ─────────────────────────────

@app.get("/api/admin/licenses")
def get_all(db: Session = Depends(get_db), _: str = Depends(verify_api_key)):
    return crud.get_all_licenses(db)


class LicenseCreate(BaseModel):
    code: str
    owner: str
    expired: str
    active: bool
    cheatnetwork_account_id: Optional[int] = None


def _resolve_cheatnetwork_account_id(db: Session, account_id: Optional[int]) -> Optional[int]:
    if account_id is None:
        account = (
            db.query(CheatNetworkAccount)
            .filter(CheatNetworkAccount.active == True)
            .order_by(CheatNetworkAccount.id)
            .first()
        )
        return account.id if account else None

    account = db.query(CheatNetworkAccount).filter(CheatNetworkAccount.id == account_id).first()
    if not account:
        raise HTTPException(status_code=400, detail="Akun CheatNetwork tidak ditemukan")
    return account.id


@app.post("/api/admin/create")
def create_license(
    data: LicenseCreate,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    existing = db.query(License).filter(License.code == data.code).first()
    if existing:
        raise HTTPException(status_code=400, detail="License sudah ada")
    lic = License(
        code=data.code,
        owner=data.owner,
        expired=datetime.strptime(data.expired, "%Y-%m-%d").date(),
        active=data.active,
        cheatnetwork_account_id=_resolve_cheatnetwork_account_id(db, data.cheatnetwork_account_id),
    )
    db.add(lic)
    db.commit()
    db.refresh(lic)
    return {"msg": "License berhasil ditambahkan"}


@app.delete("/api/admin/delete/{code}")
def delete_license(
    code: str,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    lic = db.query(License).filter(License.code == code).first()
    if not lic:
        raise HTTPException(status_code=404, detail="License tidak ditemukan")
    db.delete(lic)
    db.commit()
    return {"msg": "License dihapus"}


@app.put("/api/admin/update/{code}")
def update_license(
    code: str,
    data: LicenseCreate,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    lic = db.query(License).filter(License.code == code).first()
    if not lic:
        raise HTTPException(status_code=404, detail="License tidak ditemukan")
    lic.owner = data.owner
    lic.expired = datetime.strptime(data.expired, "%Y-%m-%d").date()
    lic.active = data.active
    lic.cheatnetwork_account_id = _resolve_cheatnetwork_account_id(db, data.cheatnetwork_account_id)
    db.commit()
    return {"msg": "License diupdate"}


# ─── Proxy endpoints with device binding + usage logging ─────────────────────

test_token = os.getenv("TEST_TOKEN")
CACHE_DURATION = 999999999


def _get_cheatnetwork_account_for_license(db: Session, lic: License) -> CheatNetworkAccount:
    account = None
    if lic.cheatnetwork_account_id:
        account = (
            db.query(CheatNetworkAccount)
            .filter(
                CheatNetworkAccount.id == lic.cheatnetwork_account_id,
                CheatNetworkAccount.active == True,
            )
            .first()
        )
    if not account:
        account = (
            db.query(CheatNetworkAccount)
            .filter(CheatNetworkAccount.active == True)
            .order_by(CheatNetworkAccount.id)
            .first()
        )
    if not account:
        raise HTTPException(status_code=500, detail="Belum ada akun cookie CheatNetwork aktif")
    return account


def _log_usage(db: Session, license_code: str, endpoint: str, pin: str, status_code: int = 200):
    try:
        log = UsageLog(
            license_code=license_code,
            endpoint=endpoint,
            pin=pin,
            status_code=status_code,
            created_at=datetime.utcnow(),
        )
        db.add(log)
        db.commit()
    except Exception:
        db.rollback()


def _extract_device_info(authorization: str, x_device_id: str, user_agent: str) -> tuple[str, str]:
    """
    Kembalikan (device_id, device_name).
    Jika client tidak mengirim x-device-id, fallback ke hash ringan dari token+UA
    supaya backward-compatible dengan script lama.
    """
    if x_device_id and x_device_id.strip():
        did = x_device_id.strip()
    else:
        # Fallback: pakai token itu sendiri sebagai device_id
        # (artinya script lama yang tidak kirim header tetap bisa pakai,
        #  dan setiap token hanya bisa dari satu "anonymous" device)
        import hashlib
        raw = f"{authorization}||{user_agent or ''}"
        did = hashlib.sha256(raw.encode()).hexdigest()[:32]

    dname = (user_agent or "Unknown")[:120]
    return did, dname


@app.get("/quizizz")
def proxy_quizizz(
    pin: str,
    request: Request,
    authorization: str = Header(None),
    x_device_id: str = Header(None),
    db: Session = Depends(get_db),
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.replace("Bearer ", "").strip()
    lic = crud.get_license(db, token)
    if not lic:
        _log_usage(db, token, "quizizz", pin, 404)
        raise HTTPException(status_code=404, detail="Token tidak valid")

    status = get_license_status(lic)
    if status != "AKTIF":
        _log_usage(db, token, "quizizz", pin, 403)
        raise HTTPException(status_code=403, detail="Token tidak aktif / expired")

    # ── Device binding check ──────────────────────────────────────────────────
    ua = request.headers.get("user-agent", "")
    device_id, device_name = _extract_device_info(authorization, x_device_id, ua)
    try:
        _validate_and_bind_device(lic, device_id, device_name, db)
    except HTTPException as e:
        _log_usage(db, token, "quizizz", pin, e.status_code)
        raise

    # ── Cache check ───────────────────────────────────────────────────────────
    cached = db.query(CacheQuizizz).filter(CacheQuizizz.pin == pin).first()
    if cached:
        age = datetime.utcnow() - cached.updated_at
        if age < timedelta(seconds=CACHE_DURATION):
            _log_usage(db, token, "quizizz", pin, 200)
            return json.loads(cached.response_data)

    try:
        cn_account = _get_cheatnetwork_account_for_license(db, lic)
        headers = {"Cookie": f"token={cn_account.cookie_token}"}
        res = requests.get(
            f"https://api.cheatnetwork.eu/quizizz/{pin}/answers",
            headers=headers,
            timeout=20,
        )
        res.raise_for_status()
        data = res.json()

        if cached:
            cached.response_data = json.dumps(data)
            cached.updated_at = datetime.utcnow()
        else:
            db.add(CacheQuizizz(pin=pin, response_data=json.dumps(data), updated_at=datetime.utcnow()))
        db.commit()

        _log_usage(db, token, "quizizz", pin, 200)
        return data

    except requests.RequestException as e:
        _log_usage(db, token, "quizizz", pin, 500)
        raise HTTPException(status_code=500, detail=f"Gagal ambil data: {str(e)}")


@app.get("/kahoot")
def proxy_kahoot(
    link: str,
    request: Request,
    authorization: str = Header(None),
    x_device_id: str = Header(None),
    db: Session = Depends(get_db),
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.replace("Bearer ", "").strip()
    lic = crud.get_license(db, token)
    if not lic:
        _log_usage(db, token, "kahoot", link, 404)
        raise HTTPException(status_code=404, detail="Token tidak valid")

    status = get_license_status(lic)
    if status != "AKTIF":
        _log_usage(db, token, "kahoot", link, 403)
        raise HTTPException(status_code=403, detail="Token tidak aktif / expired")

    # ── Device binding check ──────────────────────────────────────────────────
    ua = request.headers.get("user-agent", "")
    device_id, device_name = _extract_device_info(authorization, x_device_id, ua)
    try:
        _validate_and_bind_device(lic, device_id, device_name, db)
    except HTTPException as e:
        _log_usage(db, token, "kahoot", link, e.status_code)
        raise

    # ── Cache check ───────────────────────────────────────────────────────────
    cached = db.query(CacheKahoot).filter(CacheKahoot.pin == link).first()
    if cached:
        age = datetime.utcnow() - cached.updated_at
        if age < timedelta(seconds=CACHE_DURATION):
            _log_usage(db, token, "kahoot", link, 200)
            return json.loads(cached.response_data)

    try:
        cn_account = _get_cheatnetwork_account_for_license(db, lic)
        headers = {"Cookie": f"token={cn_account.cookie_token}"}
        res = requests.get(
            f"https://api.cheatnetwork.eu/kahoot/{link}/answers",
            headers=headers,
            timeout=20,
        )
        res.raise_for_status()
        data = res.json()

        if cached:
            cached.response_data = json.dumps(data)
            cached.updated_at = datetime.utcnow()
        else:
            db.add(CacheKahoot(pin=link, response_data=json.dumps(data), updated_at=datetime.utcnow()))
        db.commit()

        _log_usage(db, token, "kahoot", link, 200)
        return data

    except requests.RequestException as e:
        _log_usage(db, token, "kahoot", link, 500)
        raise HTTPException(status_code=500, detail=f"Gagal ambil data: {str(e)}")


@app.get("/status")
def status():
    try:
        headers = {"Authorization": f"Bearer {test_token}"}
        res = requests.get(
            "https://api-dithack.up.railway.app/quizizz?pin=03682057",
            headers=headers,
            timeout=5,
        )
        return {"ok": res.status_code == 200}
    except Exception:
        return {"ok": False}
