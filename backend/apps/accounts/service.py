from uuid import UUID
from django.db import transaction
from django.contrib.auth import get_user_model
from apps.companies.models import Company
from .models import User

class UserService:
    
    @staticmethod
    def get_me(user_id: UUID):
        return User.objects.get(id=user_id)
    
    @staticmethod
    @transaction.atomic
    def register(data):

        if Company.objects.filter(nit=data["company_nit"]).exists():
            raise ValueError("El NIT de la compañía ya existe")

        company = Company.objects.create(
            name=data["company_name"],
            nit=data["company_nit"],
            email=data["company_email"],
            phone=data["company_phone"],
        )

        user = User.objects.create_user( # pyright: ignore[reportAttributeAccessIssue]
            email=data["email"],
            password=data["password"],
            first_name=data["first_name"],
            last_name=data["last_name"],
            identification=data["identification"],
            company=company,
            role=User.Role.ADMIN,
        )

        return user