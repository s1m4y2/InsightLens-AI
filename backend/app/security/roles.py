from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from app.security.dependencies import get_current_user


def require_role(*roles):

    def checker(user=Depends(get_current_user)):

        if user.role not in roles:

            raise HTTPException(

                status_code=status.HTTP_403_FORBIDDEN,

                detail="Permission denied."

            )

        return user

    return checker