from ninja import Swagger
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI

from apps.accounts.controller import UserController
from apps.inventory.controller import CategoryController, SupplierController, ProductController
from apps.customers.controller import CustomerController
from apps.transactions.controller import TransactionController


api = NinjaExtraAPI(docs=Swagger())

api.register_controllers(NinjaJWTDefaultController)
api.register_controllers(UserController)
api.register_controllers(CategoryController)
api.register_controllers(SupplierController)
api.register_controllers(ProductController)
api.register_controllers(CustomerController)
api.register_controllers(TransactionController)