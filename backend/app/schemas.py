from pydantic import BaseModel
from datetime import date

class LicenseBase(BaseModel):
    code: str
    owner: str
    expired: date
    active: bool

class LicenseResponse(LicenseBase):
    status: str

    class Config:
        from_attributes = True