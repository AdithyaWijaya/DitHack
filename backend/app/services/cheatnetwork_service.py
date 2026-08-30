import requests
from typing import Optional
from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from backend.app.models import License,  CheatNetworkAccount
from backend.app.dependencies import number_or_zero

def get_cheatnetwork_account_for_license(db: Session, lic: License) -> CheatNetworkAccount:
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

def fetch_cheatnetwork_me(account: CheatNetworkAccount) -> dict:
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


def account_usage_snapshot(account: CheatNetworkAccount) -> dict:
    try:
        data = fetch_cheatnetwork_me(account)
        usage = data.get("usage") or {}
        user_id = data.get("userId")
        display_name = data.get("_displayName") or data.get("username") or account.name
        max_uses = number_or_zero(usage.get("maxUses"))
        uses = number_or_zero(usage.get("uses"))
        uses_left = number_or_zero(usage.get("usesLeft"))

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

def serialize_cheatnetwork_account(
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
    snapshot = account_usage_snapshot(account) if include_usage else {}
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

def resolve_cheatnetwork_account_id(db: Session, account_id: Optional[int]) -> Optional[int]:
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