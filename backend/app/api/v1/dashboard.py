from fastapi import APIRouter

from app.services.dashboard_service import DashboardService
from app.schemas.dashboard import DashboardResponse

router = APIRouter(

    prefix="/api/v1/dashboard",

    tags=["Dashboard"]

)

service = DashboardService()


@router.get(

    "",

    response_model=DashboardResponse,

    summary="Dashboard Overview"

)

def dashboard():

    return service.get_dashboard()