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
    
    @staticmethod
    @transaction.atomic
    def update_me(user_id: UUID, data: dict):
        user = User.objects.select_for_update().get(id=user_id)

        new_email = data.get("email")
        if new_email and new_email != user.email:
            if User.objects.exclude(id=user.id).filter(email=new_email).exists():
                raise ValueError("El email ya está en uso")

        allowed_fields = {"first_name", "last_name", "identification", "email"}
        for field, value in data.items():
            if field in allowed_fields and value is not None:
                setattr(user, field, value)

        user.save()
        return user

    @staticmethod
    @transaction.atomic
    def change_password(user_id: UUID, old_password: str, new_password: str):
        user = User.objects.select_for_update().get(id=user_id)

        if not user.check_password(old_password):
            raise ValueError("La contraseña actual es incorrecta")

        if len(new_password) < 8:
            raise ValueError("La nueva contraseña debe tener al menos 8 caracteres")

        user.set_password(new_password)
        user.save()
        return user