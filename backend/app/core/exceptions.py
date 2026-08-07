from fastapi import Request
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger(__name__)


class AIException(Exception):

    def __init__(self, message: str):

        self.message = message


async def ai_exception_handler(request: Request, exc: AIException):
    logger.exception(exc.message)

    return JSONResponse(

        status_code=400,

        content={

            "success": False,

            "message": exc.message

        }
    )