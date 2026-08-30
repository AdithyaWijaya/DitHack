from datetime import date
from sqlalchemy.orm import Session
from backend.app.models import License

def get_license_status(lic):
    expiry = lic.expired
    now = date.today()
    if not lic.active:
        return "TIDAK AKTIF"
    elif expiry <= now:
        return "EXPIRED"
    return "AKTIF"

def get_license(db: Session, code: str):
    return db.query(License).filter(License.code == code).first()

def get_all_licenses(db: Session):
    return db.query(License).all()

def create_license(db: Session, data: dict):
    lic = License(**data)
    db.add(lic)
    db.commit()
    db.refresh(lic)
    return lic

def license_status(lic: License) -> str:
    if not lic.active:
        return "TIDAK AKTIF"
    if lic.expired <= date.today():
        return "EXPIRED"
    return "AKTIF"


def serialize_license(l: License) -> dict:
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