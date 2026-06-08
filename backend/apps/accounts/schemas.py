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