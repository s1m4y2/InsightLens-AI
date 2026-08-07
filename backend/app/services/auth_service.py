from app.entities.user_entity import UserEntity

from app.repositories.user_repository import UserRepository

from app.security.password import (
    hash_password,
    verify_password
)

from app.security.jwt import create_token


class AuthService:

    def __init__(self):

        self.repository = UserRepository()

    def register(self, request):

        entity = UserEntity(

            username=request.username,

            email=request.email,

            password=hash_password(
                request.password
            )

        )

        self.repository.save(entity)

    def login(self, request):

        user = self.repository.find_by_email(
            request.email
        )

        if user is None:

            raise Exception(
                "User not found."
            )

        if not verify_password(

            request.password,

            user.password

        ):

            raise Exception(
                "Wrong password."
            )

        return {

            "access_token": create_token(
                user.email
            ),

            "token_type": "bearer"

        }