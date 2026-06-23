import uuid
from datetime import datetime
from ninja import Schema
from typing import Literal


# ─────────────────────────────
# Basic references
# ─────────────────────────────

class CustomerOut(Schema):
    id: uuid.UUID
    name: str


class SupplierOut(Schema):
    id: uuid.UUID
    name: str


class ProductOut(Schema):
    id: uuid.UUID
    name: str
    internal_reference: str
    
class UserOut(Schema):
    id: uuid.UUID
    email: str


# ─────────────────────────────
# Transaction input
# ─────────────────────────────

class TransactionDetailIn(Schema):
    product_id: uuid.UUID
    quantity: int


class TransactionIn(Schema):
    type: Literal["IN", "OUT"]

    customer_id: uuid.UUID | None = None
    supplier_id: uuid.UUID | None = None

    details: list[TransactionDetailIn]


# ─────────────────────────────
# Transaction output
# ─────────────────────────────

class TransactionDetailOut(Schema):
    id: uuid.UUID

    product: ProductOut

    quantity: int
    unit_price: float
    subtotal: float


class TransactionOut(Schema):
    id: uuid.UUID

    type: str
    total: float

    customer: CustomerOut | None = None
    supplier: SupplierOut | None = None
    user: UserOut

    created_at: datetime

    details: list[TransactionDetailOut]