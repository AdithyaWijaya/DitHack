from typing import Optional
from starlette.requests import Request
from pydantic import BaseModel
from datetime import date
from starlette.middleware.base import BaseHTTPMiddleware

class LicenseBase(BaseModel):
    code: str
    owner: str
    expired: date
    active: bool

class LicenseResponse(LicenseBase):
    status: str

    class Config:
        from_attributes = True

class ProxyHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.headers.get("x-forwarded-proto") == "https":
            request.scope["scheme"] = "https"
        response = await call_next(request)
        return response

class LicenseCreate(BaseModel):
    code: str
    owner: str
    expired: str
    active: bool
    cheatnetwork_account_id: Optional[int] = None

class LoginRequest(BaseModel):
    username: str
    password: str

class CheatNetworkAccountCreate(BaseModel):
    name: str
    cookie_token: str
    active: bool = True

class LicenseCreate(BaseModel):
    code: str
    owner: str
    expired: str 
    active: bool
    cheatnetwork_account_id: Optional[int] = None

class SaleCreate(BaseModel):
    license_code: str
    owner: str
    amount: int
    phone: str
    payment_method: str
    notes: Optional[str] = None