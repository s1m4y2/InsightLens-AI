from fastapi import FastAPI
from app.core.config import settings
from app.services.gemini_service import test_connection
from app.api.v1.reviews import router as review_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.ai import router as ai_router
from app.api.v1.prompt import router as prompt_router
from app.api.v1.ai_logs import router as ai_logs_router
from app.api.v1.reports import router as reports_router
from app.core.exceptions import *
from app.core.middleware import RequestTimerMiddleware
from app.api.v1.dashboard import router as dashboard_router
from app.api.v1.statistics import (router as statistics_router)
from app.api.v1.auth import router as auth_router
from app.core.logging_config import setup_logging
from app.core.request_logging_middleware import (RequestLoggingMiddleware)
from app.core.cors import setup_cors
from app.core.app_info import APP_METADATA
from app.api.v1.system import router as system_router

setup_logging()


app = FastAPI(
    **APP_METADATA
)
setup_cors(app)

app.include_router(ai_logs_router)
app.include_router(review_router)
app.include_router(analytics_router)
app.include_router(ai_router)
app.include_router(prompt_router)
app.include_router(reports_router)
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(RequestTimerMiddleware)
app.add_exception_handler(AIException, ai_exception_handler)
app.include_router(dashboard_router)
app.include_router(statistics_router)
app.include_router(auth_router)
app.include_router(system_router)


@app.get("/")
def root():

    return {

        "application": settings.APP_NAME,

        "version": settings.APP_VERSION,

        "environment": settings.ENVIRONMENT,

        "provider": settings.LLM_PROVIDER,

        "status": "running"

    }

@app.get("/health")
def health():

    return {

        "status": "UP",

        "application": settings.APP_NAME,

        "version": settings.APP_VERSION,

        "environment": settings.ENVIRONMENT,

        "provider": settings.LLM_PROVIDER,

        "model": settings.MODEL_NAME,

        "database": "PostgreSQL"

    }

@app.get("/test-gemini")
def test_gemini():
    return {
        "response": test_connection()
    }



