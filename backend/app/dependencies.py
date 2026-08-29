import requests
from datetime import date, datetime
from typing import Optional
from fastapi import Depends, HTTPException
from fastapi.security import APIKeyHeader
from sqlalchemy import func
from sqlalchemy.orm import Session
from backend.app.config import API_KEY
from backend.app.database import SessionLocal
from backend.app import models
from backend.app.models import License, UsageLog, CheatNetworkAccount

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


api_key_header = APIKeyHeader(name="x-api-key")
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

def _validate_and_bind_device(
    lic: License,
    device_id: str,
    device_name: str,
    db: Session,
) -> None:
    now = datetime.utcnow()

    if not lic.device_id:
        lic.device_id   = device_id
        lic.device_name = device_name
        lic.bound_at    = now
        lic.last_seen   = now
        db.commit()
        return

    if lic.device_id == device_id:
        lic.last_seen = now
        db.commit()
        return

    raise HTTPException(
        status_code=409,
        detail="Token sudah digunakan di perangkat lain. Hubungi admin untuk reset.",
    )

def get_license(db: Session, code: str):
    return db.query(models.License).filter(models.License.code == code).first()

def get_all_licenses(db: Session):
    return db.query(models.License).all()

def create_license(db: Session, data: dict):
    lic = models.License(**data)
    db.add(lic)
    db.commit()
    db.refresh(lic)
    return lic

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
    if x_device_id and x_device_id.strip():
        did = x_device_id.strip()
    else:
        import hashlib
        raw = f"{authorization}||{user_agent or ''}"
        did = hashlib.sha256(raw.encode()).hexdigest()[:32]

    dname = (user_agent or "Unknown")[:120]
    return did, dname

def verify_api_key(x_api_key: str = Depends(api_key_header)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")


def license_status(lic: License) -> str:
    if not lic.active:
        return "TIDAK AKTIF"
    if lic.expired <= date.today():
        return "EXPIRED"
    return "AKTIF"


def _serialize_license(l: License) -> dict:
    return {
        "id": l.id,
        "code": l.code,
        "owner": l.owner,
        "expired": str(l.expired),
        "active": l.active,
        "status": license_status(l),
        "device_id": l.device_id,
        "device_name": l.device_name,
        "bound_at": str(l.bound_at) if l.bound_at else None,
        "last_seen": str(l.last_seen) if l.last_seen else None,
        "is_bound": bool(l.device_id),
        "cheatnetwork_account_id": l.cheatnetwork_account_id,
        "cheatnetwork_account_name": l.cheatnetwork_account.name if l.cheatnetwork_account else None,
    }

def _fetch_cheatnetwork_me(account: CheatNetworkAccount) -> dict:
    try:
        res = requests.get(
            "https://api.cheatnetwork.eu/auth/me",
            headers={"Cookie": f"token={account.cookie_token}"},
            timeout=15,
        )
        data = res.json()
    except ValueError:
        raise HTTPException(status_code=502, detail="Response CheatNetwork bukan JSON")
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Gagal ambil data CheatNetwork: {str(e)}")

    if res.status_code >= 400:
        detail = data.get("detail") or data.get("message") or "Gagal ambil data CheatNetwork"
        raise HTTPException(status_code=res.status_code, detail=detail)

    return data


def _account_usage_snapshot(account: CheatNetworkAccount) -> dict:
    try:
        data = _fetch_cheatnetwork_me(account)
        usage = data.get("usage") or {}
        user_id = data.get("userId")
        display_name = data.get("_displayName") or data.get("username") or account.name
        max_uses = _number_or_zero(usage.get("maxUses"))
        uses = _number_or_zero(usage.get("uses"))
        uses_left = _number_or_zero(usage.get("usesLeft"))

        return {
            "ok": True,
            "display_name": display_name,
            "user_id": user_id or account.user_id,
            "uses": uses,
            "max_uses": max_uses,
            "uses_left": uses_left,
            "timestamp": usage.get("timestamp"),
        }
    except HTTPException as e:
        return {
            "ok": False,
            "display_name": account.name,
            "user_id": account.user_id,
            "uses": 0,
            "max_uses": 0,
            "uses_left": 0,
            "timestamp": None,
            "error": e.detail,
        }


def _number_or_zero(value) -> int:
    try:
        return int(value or 0)
    except (TypeError, ValueError):
        return 0


def _serialize_cheatnetwork_account(
    account: CheatNetworkAccount,
    db: Session,
    include_token: bool = False,
    include_usage: bool = True,
) -> dict:
    license_count = (
        db.query(func.count(License.id))
        .filter(License.cheatnetwork_account_id == account.id)
        .scalar()
        or 0
    )
    snapshot = _account_usage_snapshot(account) if include_usage else {}
    user_id = snapshot.get("user_id") or account.user_id
    if user_id and user_id != account.user_id:
        account.user_id = str(user_id)
        db.commit()

    result = {
        "id": account.id,
        "name": account.name,
        "user_id": user_id,
        "active": account.active,
        "license_count": license_count,
        "usage": {
            "uses": snapshot.get("uses", 0),
            "max_uses": snapshot.get("max_uses", 0),
            "uses_left": snapshot.get("uses_left", 0),
            "timestamp": snapshot.get("timestamp"),
        },
        "display_name": snapshot.get("display_name") or account.name,
        "ok": snapshot.get("ok", True),
        "error": snapshot.get("error"),
    }
    if include_token:
        result["cookie_token"] = account.cookie_token
    return result

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