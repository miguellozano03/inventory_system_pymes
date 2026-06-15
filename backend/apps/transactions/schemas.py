import uuid
from datetime import datetime
from ninja import Schema
from typing import Literal


class TransactionDetailIn(Schema):
    product_id: uuid.UUID
    quantity: int


class TransactionIn(Schema):
    type: Literal["IN", "OUT"]

    customer_id: uuid.UUID | None = None
    supplier_id: uuid.UUID | None = None

    details: list[TransactionDetailIn]


class TransactionDetailOut(Schema):
    id: uuid.UUID

    product_id: uuid.UUID
    product_name: str

    quantity: int
    unit_price: float
    subtotal: float


class TransactionOut(Schema):
    id: uuid.UUID

    type: str
    total: float

    customer_id: uuid.UUID | None = None
    supplier_id: uuid.UUID | None = None

    created_at: datetime

    details: list[TransactionDetailOut]