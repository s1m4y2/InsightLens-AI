from fastapi import APIRouter

from app.services.analytics_service import AnalyticsService
from app.schemas.analytics import (
    DashboardResponse,
    AnalyticsResponse,
)

router = APIRouter(
    prefix="/api/v1/analytics",
    tags=["Analytics"]
)

service = AnalyticsService()


@router.get(
    "/dashboard",
    response_model=DashboardResponse
)
def get_dashboard():

    return service.get_dashboard()


@router.get(
    "/charts",
    response_model=AnalyticsResponse
)
def get_analytics():

    return service.get_analytics()