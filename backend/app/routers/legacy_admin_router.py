from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app import dependencies
from backend.app.dependencies import get_db, verify_api_key
from backend.app.models import License, CheatNetworkAccount
from backend.app.schemas import LicenseCreate

router = APIRouter(prefix="", tags=["adminlegacy"])

@router.get("/api/admin/licenses")
def get_all(db: Session = Depends(get_db), _: str = Depends(verify_api_key)):
    return dependencies.get_all_licenses(db)

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


@router.post("/api/admin/create")
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


@router.delete("/api/admin/delete/{code}")
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


@router.put("/api/admin/update/{code}")
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