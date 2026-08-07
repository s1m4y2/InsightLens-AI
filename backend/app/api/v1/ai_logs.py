from fastapi import APIRouter, Depends
from app.schemas.ai_log import (AILogResponse, AILogDetailResponse)
from app.services.ai_log_service import AILogService
from app.security.roles import require_role

router = APIRouter(

    prefix="/api/v1/ai/logs",

    tags=["AI Logs"]

)

service = AILogService()


@router.get(
    "",
    response_model=list[AILogResponse]
)
def get_logs(user=Depends(require_role("ADMIN"))):

    return service.get_logs()


@router.get(
    "/{log_id}",
    response_model=AILogDetailResponse
)
def get_log(
    log_id: int,
    user=Depends(require_role("ADMIN"))
):

    return service.get_log(log_id)