from fastapi import APIRouter

from app.schemas.user import (
    RegisterRequest,
    LoginRequest,
    TokenResponse
)
from fastapi import Depends

from app.security.dependencies import (
    get_current_user
)
from app.services.auth_service import AuthService

router = APIRouter(

    prefix="/api/v1/auth",

    tags=["Authentication"]

)

service = AuthService()


@router.post("/register")
def register(request: RegisterRequest):

    service.register(request)

    return {

        "message": "Registered successfully."

    }


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(request: LoginRequest):

    return service.login(request)

@router.get("/me")
def me(

    user = Depends(get_current_user)

):

    return {

        "id": user.id,

        "username": user.username,

        "email": user.email,

        "role": user.role

    }