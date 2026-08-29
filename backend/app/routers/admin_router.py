from datetime import datetime, date, timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import APIKeyHeader
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from backend.app.models import (
    License,
    CacheQuizizz,
    CacheKahoot,
    SaleLog,
    UsageLog,
    CheatNetworkAccount,
)
from backend.app.dependencies import get_db, verify_api_key, _serialize_license, _fetch_cheatnetwork_me, _serialize_cheatnetwork_account, _resolve_cheatnetwork_account_id
from backend.app.schemas import LoginRequest, CheatNetworkAccountCreate, LicenseCreate, SaleCreate
from backend.app.config import API_KEY, ADMIN_USER, ADMIN_PASS

router = APIRouter(prefix="/api/admin", tags=["admin"])

api_key_header = APIKeyHeader(name="x-api-key", auto_error=False)

@router.post("/auth")
def admin_login(data: LoginRequest):
    if data.username == ADMIN_USER and data.password == ADMIN_PASS:
        return {"api_key": API_KEY}
    raise HTTPException(status_code=401, detail="Username atau password salah")


@router.get("/cheatnetwork/me")
def cheatnetwork_me(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    account = (
        db.query(CheatNetworkAccount)
        .filter(CheatNetworkAccount.active == True)
        .order_by(CheatNetworkAccount.id)
        .first()
    )
    if not account:
        raise HTTPException(status_code=404, detail="Belum ada akun CheatNetwork")
    return _fetch_cheatnetwork_me(account)


@router.get("/cheatnetwork/accounts")
def list_cheatnetwork_accounts(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    accounts = db.query(CheatNetworkAccount).order_by(CheatNetworkAccount.id).all()
    return [_serialize_cheatnetwork_account(a, db) for a in accounts]


@router.get("/cheatnetwork/accounts/options")
def list_cheatnetwork_account_options(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    accounts = (
        db.query(CheatNetworkAccount)
        .filter(CheatNetworkAccount.active == True)
        .order_by(CheatNetworkAccount.id)
        .all()
    )
    options = []
    for account in accounts:
        item = _serialize_cheatnetwork_account(account, db)
        usage = item["usage"]
        label = f"{item['name']} ({usage['uses']}/{usage['max_uses']})"
        options.append({**item, "label": label})
    return options


@router.get("/cheatnetwork/accounts/{account_id}")
def get_cheatnetwork_account(
    account_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    account = db.query(CheatNetworkAccount).filter(CheatNetworkAccount.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Akun CheatNetwork tidak ditemukan")
    return _serialize_cheatnetwork_account(account, db, include_token=True)


@router.post("/cheatnetwork/accounts")
def create_cheatnetwork_account(
    data: CheatNetworkAccountCreate,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    account = CheatNetworkAccount(
        name=data.name.strip(),
        cookie_token=data.cookie_token.strip().removeprefix("token=").strip(),
        active=data.active,
    )
    if not account.name or not account.cookie_token:
        raise HTTPException(status_code=400, detail="Nama akun dan token cookie wajib diisi")
    db.add(account)
    db.commit()
    db.refresh(account)
    return {"msg": "Akun CheatNetwork ditambahkan", "id": account.id}


@router.put("/cheatnetwork/accounts/{account_id}")
def update_cheatnetwork_account(
    account_id: int,
    data: CheatNetworkAccountCreate,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    account = db.query(CheatNetworkAccount).filter(CheatNetworkAccount.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Akun CheatNetwork tidak ditemukan")
    account.name = data.name.strip()
    account.cookie_token = data.cookie_token.strip().removeprefix("token=").strip()
    account.active = data.active
    account.updated_at = datetime.utcnow()
    if not account.name or not account.cookie_token:
        raise HTTPException(status_code=400, detail="Nama akun dan token cookie wajib diisi")
    db.commit()
    return {"msg": "Akun CheatNetwork diupdate"}


@router.delete("/cheatnetwork/accounts/{account_id}")
def delete_cheatnetwork_account(
    account_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    account = db.query(CheatNetworkAccount).filter(CheatNetworkAccount.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Akun CheatNetwork tidak ditemukan")

    linked_count = (
        db.query(func.count(License.id))
        .filter(License.cheatnetwork_account_id == account.id)
        .scalar()
        or 0
    )
    (
        db.query(License)
        .filter(License.cheatnetwork_account_id == account.id)
        .update({License.cheatnetwork_account_id: None}, synchronize_session=False)
    )
    db.delete(account)
    db.commit()
    return {
        "msg": "Akun CheatNetwork dihapus",
        "unlinked_licenses": linked_count,
    }


@router.get("/stats/dashboard")
def dashboard_stats(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    today = date.today()
    first_day = today.replace(day=1)
    today_start = datetime.combine(today, datetime.min.time())

    total_lic = db.query(func.count(License.id)).scalar() or 0
    active_lic = (
        db.query(func.count(License.id))
        .filter(License.active == True, License.expired > today)
        .scalar() or 0
    )
    expired_lic = (
        db.query(func.count(License.id))
        .filter(License.expired <= today)
        .scalar() or 0
    )
    inactive_lic = (
        db.query(func.count(License.id))
        .filter(License.active == False)
        .scalar() or 0
    )

    bound_lic = (
        db.query(func.count(License.id))
        .filter(License.device_id != None)
        .scalar() or 0
    )

    total_rev = db.query(func.sum(SaleLog.amount)).scalar() or 0
    month_rev = (
        db.query(func.sum(SaleLog.amount))
        .filter(SaleLog.created_at >= datetime.combine(first_day, datetime.min.time()))
        .scalar() or 0
    )
    total_sales = db.query(func.count(SaleLog.id)).scalar() or 0

    usage_today = (
        db.query(func.count(UsageLog.id))
        .filter(UsageLog.created_at >= today_start)
        .scalar() or 0
    )
    usage_total = db.query(func.count(UsageLog.id)).scalar() or 0

    cache_q = db.query(func.count(CacheQuizizz.id)).scalar() or 0
    cache_k = db.query(func.count(CacheKahoot.id)).scalar() or 0

    return {
        "total_licenses": total_lic,
        "active_licenses": active_lic,
        "expired_licenses": expired_lic,
        "inactive_licenses": inactive_lic,
        "bound_licenses": bound_lic,
        "total_revenue": total_rev,
        "month_revenue": month_rev,
        "total_sales": total_sales,
        "usage_today": usage_today,
        "usage_total": usage_total,
        "cache_quizizz": cache_q,
        "cache_kahoot": cache_k,
    }


@router.get("/stats/revenue")
def revenue_chart(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    since = datetime.utcnow() - timedelta(days=30)
    rows = (
        db.query(
            func.date(SaleLog.created_at).label("day"),
            func.sum(SaleLog.amount).label("total"),
            func.count(SaleLog.id).label("count"),
        )
        .filter(SaleLog.created_at >= since)
        .group_by(func.date(SaleLog.created_at))
        .order_by("day")
        .all()
    )
    return [{"date": str(r.day), "total": r.total or 0, "count": r.count} for r in rows]


@router.get("/stats/usage")
def usage_chart(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    since = datetime.utcnow() - timedelta(days=14)
    rows = (
        db.query(
            func.date(UsageLog.created_at).label("day"),
            UsageLog.endpoint,
            func.count(UsageLog.id).label("count"),
        )
        .filter(UsageLog.created_at >= since)
        .group_by(func.date(UsageLog.created_at), UsageLog.endpoint)
        .order_by("day")
        .all()
    )
    return [{"date": str(r.day), "endpoint": r.endpoint, "count": r.count} for r in rows]


@router.get("/stats/top-users")
def top_users(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    first_day = datetime.combine(date.today().replace(day=1), datetime.min.time())
    rows = (
        db.query(
            UsageLog.license_code,
            func.count(UsageLog.id).label("count"),
        )
        .filter(UsageLog.created_at >= first_day)
        .group_by(UsageLog.license_code)
        .order_by(desc("count"))
        .limit(10)
        .all()
    )
    return [{"code": r.license_code, "count": r.count} for r in rows]


@router.get("/licenses")
def list_licenses(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    licenses = db.query(License).order_by(desc(License.id)).all()
    return [_serialize_license(l) for l in licenses]


@router.post("/licenses")
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
    return {"msg": "License berhasil ditambahkan", "id": lic.id}


@router.put("/licenses/{code}")
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


@router.delete("/licenses/{code}")
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


@router.post("/licenses/{code}/reset-device")
def reset_device_binding(
    code: str,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    lic = db.query(License).filter(License.code == code).first()
    if not lic:
        raise HTTPException(status_code=404, detail="License tidak ditemukan")

    if not lic.device_id:
        raise HTTPException(status_code=400, detail="Token ini belum ter-bind ke device manapun")

    old_device = lic.device_name or lic.device_id
    lic.device_id   = None
    lic.device_name = None
    lic.bound_at    = None
    db.commit()

    return {
        "msg": f"Device binding berhasil di-reset. Token '{code}' kini bisa digunakan di perangkat baru.",
        "previous_device": old_device,
    }


@router.get("/licenses/{code}/device")
def get_device_info(
    code: str,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    lic = db.query(License).filter(License.code == code).first()
    if not lic:
        raise HTTPException(status_code=404, detail="License tidak ditemukan")

    return {
        "code": lic.code,
        "is_bound": bool(lic.device_id),
        "device_id": lic.device_id,
        "device_name": lic.device_name,
        "bound_at": str(lic.bound_at) if lic.bound_at else None,
        "last_seen": str(lic.last_seen) if lic.last_seen else None,
    }


@router.get("/cache/quizizz")
def cache_quizizz(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    items = db.query(CacheQuizizz).order_by(desc(CacheQuizizz.updated_at)).all()
    return [
        {"id": i.id, "pin": i.pin, "updated_at": str(i.updated_at)}
        for i in items
    ]


@router.delete("/cache/quizizz/{pin}")
def delete_cache_quizizz(
    pin: str,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    item = db.query(CacheQuizizz).filter(CacheQuizizz.pin == pin).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(item)
    db.commit()
    return {"msg": "Cache dihapus"}


@router.delete("/cache/quizizz")
def clear_cache_quizizz(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    db.query(CacheQuizizz).delete()
    db.commit()
    return {"msg": "Semua cache Quizizz dihapus"}


@router.get("/cache/kahoot")
def cache_kahoot(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    items = db.query(CacheKahoot).order_by(desc(CacheKahoot.updated_at)).all()
    return [
        {"id": i.id, "pin": i.pin, "updated_at": str(i.updated_at)}
        for i in items
    ]


@router.delete("/cache/kahoot/{pin}")
def delete_cache_kahoot(
    pin: str,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    item = db.query(CacheKahoot).filter(CacheKahoot.pin == pin).first()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(item)
    db.commit()
    return {"msg": "Cache dihapus"}


@router.delete("/cache/kahoot")
def clear_cache_kahoot(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    db.query(CacheKahoot).delete()
    db.commit()
    return {"msg": "Semua cache Kahoot dihapus"}


@router.get("/sales")
def list_sales(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    sales = db.query(SaleLog).order_by(desc(SaleLog.created_at)).all()
    return [
        {
            "id": s.id,
            "license_code": s.license_code,
            "owner": s.owner,
            "amount": s.amount,
            "phone": s.phone,
            "payment_method": s.payment_method,
            "notes": s.notes,
            "created_at": str(s.created_at),
        }
        for s in sales
    ]


@router.post("/sales")
def create_sale(
    data: SaleCreate,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    sale = SaleLog(**data.dict())
    db.add(sale)
    db.commit()
    db.refresh(sale)
    return {"msg": "Penjualan dicatat", "id": sale.id}


@router.delete("/sales/{sale_id}")
def delete_sale(
    sale_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    sale = db.query(SaleLog).filter(SaleLog.id == sale_id).first()
    if not sale:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(sale)
    db.commit()
    return {"msg": "Dihapus"}


@router.get("/usage")
def list_usage(
    limit: int = 200,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    logs = (
        db.query(UsageLog)
        .order_by(desc(UsageLog.created_at))
        .limit(limit)
        .all()
    )
    return [
        {
            "id": l.id,
            "license_code": l.license_code,
            "endpoint": l.endpoint,
            "pin": l.pin,
            "status_code": l.status_code,
            "created_at": str(l.created_at),
        }
        for l in logs
    ]


@router.delete("/usage")
def clear_usage(
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key),
):
    db.query(UsageLog).delete()
    db.commit()
    return {"msg": "Usage log dibersihkan"}
