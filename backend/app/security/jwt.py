from datetime import datetime
from datetime import timedelta

from jose import JWTError, jwt

from app.core.config import settings


def create_token(email: str):

    expire = datetime.utcnow() + timedelta(

        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES

    )

    payload = {

        "sub": email,

        "exp": expire

    }

    return jwt.encode(

        payload,

        settings.JWT_SECRET_KEY,

        algorithm=settings.JWT_ALGORITHM

    )

def decode_token(
    token: str
):

    try:

        payload = jwt.decode(

            token,

            settings.JWT_SECRET_KEY,

            algorithms=[
                settings.JWT_ALGORITHM
            ]

        )

        return payload

    except JWTError:

        return None