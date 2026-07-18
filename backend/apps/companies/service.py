from uuid import UUID
from django.db import transaction
from .models import Company


class CompanyService:

    @staticmethod
    def get_my_company(company_id: UUID | None):
        if company_id is None:
            raise ValueError("El usuario no tiene una compañía asociada")
        return Company.objects.get(id=company_id)

    @staticmethod
    @transaction.atomic
    def update_my_company(company_id: UUID | None, data: dict):
        if company_id is None:
            raise ValueError("El usuario no tiene una compañía asociada")

        company = Company.objects.select_for_update().get(id=company_id)

        allowed_fields = {"name", "email", "phone"}
        for field, value in data.items():
            if field in allowed_fields and value is not None:
                setattr(company, field, value)

        company.save()
        return company