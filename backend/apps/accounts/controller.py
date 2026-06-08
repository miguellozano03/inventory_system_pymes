from ninja_extra import route, api_controller
from ninja_jwt.authentication import JWTAuth
from .service import UserService
from .schemas import UserResponse, RegisterSchema

@api_controller("/accounts")
class UserController:
    @route.get("/me", auth=JWTAuth(), response=UserResponse)
    def me(self, request):
        return UserService.get_me(request.user.id)
    
    @route.post("/register", response=UserResponse)
    def register(self, request, payload: RegisterSchema):
        return UserService.register(payload.dict())