from fastapi import APIRouter

from app.schemas.statistics import (
    StatisticsResponse,
)

from app.services.statistics_service import (
    StatisticsService,
)

router = APIRouter(

    prefix="/api/v1/statistics",

    tags=["Statistics"]

)

service = StatisticsService()


@router.get(

    "",

    response_model=StatisticsResponse

)
def statistics():

    return service.get_statistics()