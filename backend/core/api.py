from ninja import Swagger
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI

from apps.accounts.controller import UserController


api = NinjaExtraAPI(docs=Swagger())
api.register_controllers(NinjaJWTDefaultController)
api.register_controllers(UserController)