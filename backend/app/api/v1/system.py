from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(

    prefix="/api/v1/system",

    tags=["System"]

)


@router.get("/info")

def info():

    return {

        "application": settings.APP_NAME,

        "version": settings.APP_VERSION,

        "environment": settings.ENVIRONMENT,

        "provider": settings.LLM_PROVIDER,

        "model": settings.MODEL_NAME

    }