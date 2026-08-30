from datetime import datetime
from fastapi import Depends, HTTPException
from fastapi.security import APIKeyHeader
from sqlalchemy.orm import Session
from backend.app.config import API_KEY
from backend.app.database import SessionLocal
from backend.app.models import UsageLog

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

def log_usage(db: Session, license_code: str, endpoint: str, pin: str, status_code: int = 200):
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

def number_or_zero(value) -> int:
    try:
        return int(value or 0)
    except (TypeError, ValueError):
        return 0
