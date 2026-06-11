from sqlalchemy.orm import Session
from backend.app import models

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