from typing import Optional
from .models import Company
from ninja import Schema, ModelSchema
from pydantic import EmailStr


class CompanyResponse(ModelSchema):
    class Meta:
        model = Company
        fields = ["id", "name", "nit", "email", "phone", "created_at", "updated_at"]


class UpdateCompanySchema(Schema):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None