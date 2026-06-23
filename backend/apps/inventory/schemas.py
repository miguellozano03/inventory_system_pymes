import uuid
from decimal import Decimal
from typing import Optional
from ninja import Schema


# ──────────────────────────────────────────
# Category
# ──────────────────────────────────────────

class CategoryIn(Schema):
    name: str
    description: Optional[str] = None


class CategoryOut(Schema):
    id: uuid.UUID
    company_id: uuid.UUID
    name: str
    description: Optional[str] = None


class CategoryUpdate(Schema):
    name: Optional[str] = None
    description: Optional[str] = None


# ──────────────────────────────────────────
# Product
# ──────────────────────────────────────────

class ProductIn(Schema):
    category_id: uuid.UUID
    supplier_id: Optional[uuid.UUID] = None
    internal_reference: str
    name: str
    description: Optional[str] = None
    stock: int = 0
    cost_price: Decimal
    sale_price: Decimal
    is_active: bool = True


class ProductOut(Schema):
    id: uuid.UUID
    company_id: uuid.UUID
    category_id: uuid.UUID
    category_name: str
    supplier_id: Optional[uuid.UUID] = None

    internal_reference: str
    name: str
    description: Optional[str] = None
    stock: int
    cost_price: Decimal
    sale_price: Decimal
    is_active: bool
    created_at: str
    updated_at: str

    @staticmethod
    def resolve_category_name(obj):
        return obj.category.name if obj.category else None

    @staticmethod
    def resolve_supplier_id(obj):
        return obj.supplier.id if obj.supplier else None

    @staticmethod
    def resolve_supplier_name(obj):
        return obj.supplier.name if obj.supplier else None

    @staticmethod
    def resolve_created_at(obj):
        return obj.created_at.isoformat()

    @staticmethod
    def resolve_updated_at(obj):
        return obj.updated_at.isoformat()


class ProductUpdate(Schema):
    category_id: Optional[uuid.UUID] = None
    supplier_id: Optional[uuid.UUID] = None
    internal_reference: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    stock: Optional[int] = None
    cost_price: Optional[Decimal] = None
    sale_price: Optional[Decimal] = None
    is_active: Optional[bool] = None