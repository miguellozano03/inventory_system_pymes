from ninja_extra import route, api_controller
from ninja_jwt.authentication import JWTAuth
from ninja.errors import HttpError
from .service import UserService
from .schemas import UserResponse, RegisterSchema, UpdateMeSchema, ChangePasswordSchema

@api_controller("/accounts")
class UserController:

    @route.get("/me", auth=JWTAuth(), response=UserResponse)
    def me(self, request):
        return UserService.get_me(request.user.id)

    @route.post("/register", response=UserResponse)
    def register(self, request, payload: RegisterSchema):
        return UserService.register(payload.dict())

    @route.put("/me", auth=JWTAuth(), response=UserResponse)
    def update_me(self, request, payload: UpdateMeSchema):
        try:
            return UserService.update_me(
                request.user.id,
                payload.dict(exclude_unset=True)
            )
        except ValueError as e:
            raise HttpError(400, str(e))

    @route.post("/me/change-password", auth=JWTAuth())
    def change_password(self, request, payload: ChangePasswordSchema):
        try:
            UserService.change_password(
                request.user.id,
                payload.old_password,
                payload.new_password
            )
            return {"success": True, "message": "Contraseña actualizada correctamente"}
        except ValueError as e:
            raise HttpError(400, str(e))