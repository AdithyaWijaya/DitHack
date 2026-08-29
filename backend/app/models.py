from sqlalchemy import Column, Integer, String, Boolean, Date, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.app.database import Base


class License(Base):
    __tablename__ = "licenses"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(100), unique=True, index=True)
    owner = Column(String(100))
    expired = Column(Date)
    active = Column(Boolean)
    device_id   = Column(String(200), nullable=True)
    device_name = Column(String(200), nullable=True)
    bound_at    = Column(DateTime, nullable=True)
    last_seen   = Column(DateTime, nullable=True)

    cheatnetwork_account_id = Column(Integer, ForeignKey("cheatnetwork_accounts.id"), nullable=True)
    cheatnetwork_account = relationship("CheatNetworkAccount", back_populates="licenses")


class CheatNetworkAccount(Base):
    __tablename__ = "cheatnetwork_accounts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    cookie_token = Column(Text, nullable=False)
    user_id = Column(String(100), nullable=True)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    licenses = relationship("License", back_populates="cheatnetwork_account")


class CacheQuizizz(Base):
    __tablename__ = "CacheQuizizz"

    id = Column(Integer, primary_key=True, index=True)
    pin = Column(String, unique=True, index=True)
    response_data = Column(Text)
    updated_at = Column(DateTime)


class CacheKahoot(Base):
    __tablename__ = "CacheKahoot"

    id = Column(Integer, primary_key=True, index=True)
    pin = Column(String, unique=True, index=True)
    response_data = Column(Text)
    updated_at = Column(DateTime)


class SaleLog(Base):
    __tablename__ = "sale_logs"

    id = Column(Integer, primary_key=True, index=True)
    license_code = Column(String(100), index=True)
    owner = Column(String(100))
    amount = Column(Integer, default=0)
    phone = Column(String(20))
    payment_method = Column(String(50))
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())


class UsageLog(Base):
    __tablename__ = "usage_logs"

    id = Column(Integer, primary_key=True, index=True)
    license_code = Column(String(100), index=True)
    endpoint = Column(String(50))
    pin = Column(String(200))
    status_code = Column(Integer, default=200)
    created_at = Column(DateTime, server_default=func.now())
