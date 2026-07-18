from ninja import Swagger
from ninja_jwt.controller import NinjaJWTDefaultController
from ninja_extra import NinjaExtraAPI

from apps.accounts.controller import UserController
from apps.companies.controller import CompanyController
from apps.inventory.controller import CategoryController, ProductController
from apps.contacts.controller import CustomerController, SupplierController
from apps.transactions.controller import TransactionController


api = NinjaExtraAPI(docs=Swagger())

api.register_controllers(NinjaJWTDefaultController)
api.register_controllers(UserController)
api.register_controllers(CompanyController)
api.register_controllers(CategoryController)
api.register_controllers(SupplierController)
api.register_controllers(ProductController)
api.register_controllers(CustomerController)
api.register_controllers(TransactionController)