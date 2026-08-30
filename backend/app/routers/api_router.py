import requests
from starlette.requests import Request
from datetime import datetime, timedelta
import json
from fastapi import APIRouter,  Depends, HTTPException, Header
from sqlalchemy.orm import Session
from backend.app.schemas import LicenseResponse
from backend.app.models import CacheQuizizz, CacheKahoot
from backend.app.dependencies import get_db, log_usage
from backend.app.services.license_service import get_license, get_license_status
from backend.app.services.device_binding_service import extract_device_info, validate_and_bind_device
from backend.app.services.cheatnetwork_service import get_cheatnetwork_account_for_license
from backend.app.config import CACHE_DURATION

router = APIRouter(prefix="", tags=["api"])

@router.get("/check/{token}", response_model=LicenseResponse)
def check_token(
    token: str,
    request: Request,
    x_device_id: str = Header(None),
    db: Session = Depends(get_db),
):
    lic = get_license(db, token)
    if not lic:
        raise HTTPException(status_code=404, detail="Token tidak valid")
    status = get_license_status(lic)
    if status == "AKTIF":
        ua = request.headers.get("user-agent", "")
        device_id, device_name = extract_device_info(f"Bearer {token}", x_device_id, ua)
        validate_and_bind_device(lic, device_id, device_name, db)

    return {
        "code": lic.code,
        "owner": lic.owner,
        "expired": lic.expired,
        "active": lic.active,
        "status": status,
    }


@router.post("/logout")
def logout_device(
    authorization: str = Header(None),
    x_device_id: str = Header(None),
    db: Session = Depends(get_db),
):
    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.replace("Bearer ", "").strip()

    lic = get_license(db, token)
    if not lic:
        raise HTTPException(status_code=404, detail="Token tidak valid")

    if not x_device_id:
        raise HTTPException(status_code=400, detail="Device ID diperlukan")

    if lic.device_id != x_device_id:
        raise HTTPException(status_code=403, detail="Device tidak cocok")

    lic.device_id = None
    lic.device_name = None
    lic.bound_at = None
    lic.last_seen = None

    db.commit()

    return {"msg": "Logout berhasil"}

@router.get("/quizizz")
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
    lic = get_license(db, token)
    if not lic:
        log_usage(db, token, "quizizz", pin, 404)
        raise HTTPException(status_code=404, detail="Token tidak valid")

    status = get_license_status(lic)
    if status != "AKTIF":
        log_usage(db, token, "quizizz", pin, 403)
        raise HTTPException(status_code=403, detail="Token tidak aktif / expired")

    ua = request.headers.get("user-agent", "")
    device_id, device_name = extract_device_info(authorization, x_device_id, ua)
    try:
        validate_and_bind_device(lic, device_id, device_name, db)
    except HTTPException as e:
        log_usage(db, token, "quizizz", pin, e.status_code)
        raise

    cached = db.query(CacheQuizizz).filter(CacheQuizizz.pin == pin).first()
    if cached:
        age = datetime.utcnow() - cached.updated_at
        if age < timedelta(seconds=CACHE_DURATION):
            log_usage(db, token, "quizizz", pin, 200)
            return json.loads(cached.response_data)

    try:
        cn_account = get_cheatnetwork_account_for_license(db, lic)
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

        log_usage(db, token, "quizizz", pin, 200)
        return data

    except requests.RequestException as e:
        log_usage(db, token, "quizizz", pin, 500)
        raise HTTPException(status_code=500, detail=f"Gagal ambil data: {str(e)}")


@router.get("/kahoot")
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
    lic = get_license(db, token)
    if not lic:
        log_usage(db, token, "kahoot", link, 404)
        raise HTTPException(status_code=404, detail="Token tidak valid")

    status = get_license_status(lic)
    if status != "AKTIF":
        log_usage(db, token, "kahoot", link, 403)
        raise HTTPException(status_code=403, detail="Token tidak aktif / expired")

    ua = request.headers.get("user-agent", "")
    device_id, device_name = extract_device_info(authorization, x_device_id, ua)
    try:
        validate_and_bind_device(lic, device_id, device_name, db)
    except HTTPException as e:
        log_usage(db, token, "kahoot", link, e.status_code)
        raise

    cached = db.query(CacheKahoot).filter(CacheKahoot.pin == link).first()
    if cached:
        age = datetime.utcnow() - cached.updated_at
        if age < timedelta(seconds=CACHE_DURATION):
            log_usage(db, token, "kahoot", link, 200)
            return json.loads(cached.response_data)

    try:
        cn_account = get_cheatnetwork_account_for_license(db, lic)
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

        log_usage(db, token, "kahoot", link, 200)
        return data

    except requests.RequestException as e:
        log_usage(db, token, "kahoot", link, 500)
        raise HTTPException(status_code=500, detail=f"Gagal ambil data: {str(e)}")