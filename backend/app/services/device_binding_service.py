from fastapi import HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from backend.app.models import License

def extract_device_info(authorization: str, x_device_id: str, user_agent: str) -> tuple[str, str]:
    if x_device_id and x_device_id.strip():
        did = x_device_id.strip()
    else:
        import hashlib
        raw = f"{authorization}||{user_agent or ''}"
        did = hashlib.sha256(raw.encode()).hexdigest()[:32]

    dname = (user_agent or "Unknown")[:120]
    return did, dname

def validate_and_bind_device(
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