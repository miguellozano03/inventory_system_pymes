import uuid
from typing import Optional
from ninja import Schema


class CustomerIn(Schema):
    name: str
    identification: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class CustomerOut(Schema):
    id: uuid.UUID
    company_id: uuid.UUID
    name: str
    identification: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    created_at: str
    updated_at: str

    @staticmethod
    def resolve_created_at(obj):
        return obj.created_at.isoformat()

    @staticmethod
    def resolve_updated_at(obj):
        return obj.updated_at.isoformat()


class CustomerUpdate(Schema):
    name: Optional[str] = None
    identification: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None