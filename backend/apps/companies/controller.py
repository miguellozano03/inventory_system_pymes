from ninja_extra import route, api_controller
from ninja_jwt.authentication import JWTAuth
from ninja.errors import HttpError
from .service import CompanyService
from .schemas import CompanyResponse, UpdateCompanySchema
from .models import Company


@api_controller("/companies")
class CompanyController:

    @route.get("/me", auth=JWTAuth(), response=CompanyResponse)
    def my_company(self, request):
        try:
            return CompanyService.get_my_company(request.user.company_id)
        except Company.DoesNotExist:
            raise HttpError(404, "Compañía no encontrada")
        except ValueError as e:
            raise HttpError(400, str(e))

    @route.put("/me", auth=JWTAuth(), response=CompanyResponse)
    def update_my_company(self, request, payload: UpdateCompanySchema):
        if request.user.role != "ADMIN":
            raise HttpError(403, "Solo un administrador puede editar la compañía")

        try:
            return CompanyService.update_my_company(
                request.user.company_id,
                payload.dict(exclude_unset=True)
            )
        except Company.DoesNotExist:
            raise HttpError(404, "Compañía no encontrada")
        except ValueError as e:
            raise HttpError(400, str(e))