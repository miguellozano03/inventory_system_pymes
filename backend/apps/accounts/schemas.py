from typing import Optional
from .models import User
from ninja import Schema, ModelSchema
from pydantic import EmailStr

class UserResponse(ModelSchema):
    class Meta:
        model = User
        exclude = ['password']
        
class RegisterSchema(Schema):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    identification: str
    
    company_name: str
    company_nit: str
    company_email: str
    company_phone: str
    
class UpdateMeSchema(Schema):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    identification: Optional[str] = None
    email: Optional[EmailStr] = None


class ChangePasswordSchema(Schema):
    old_password: str
    new_password: str