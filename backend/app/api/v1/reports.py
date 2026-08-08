from fastapi import APIRouter
from fastapi.responses import FileResponse
from fastapi import Depends

from app.security.roles import require_role
from app.services.report_service import ReportService
from app.services.notification_service import NotificationService

router = APIRouter(
    prefix="/api/v1/reports",
    tags=["Reports"]
)

service = ReportService()
notification_service = NotificationService()

@router.get(
    "/csv",
    summary="Export reviews as CSV"
)
def export_csv(
    user=Depends(require_role("ADMIN"))
):

    path = service.export("csv")

    notification_service.create(

        user_id=user.id,

        title="Report exported",

        description="CSV report downloaded successfully.",

        type="report"

    )

    return FileResponse(
        path,
        filename="reviews.csv",
        media_type="text/csv"
    )


@router.get(
    "/excel",
    summary="Export reviews as Excel"
)
def export_excel(
    user=Depends(require_role("ADMIN"))
):

    path = service.export("excel")

    notification_service.create(

        user_id=user.id,

        title="Report exported",

        description="Excel report downloaded successfully.",

        type="report"

    )

    return FileResponse(
        path,
        filename="reviews.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


@router.get(
    "/pdf",
    summary="Export reviews as PDF"
)
def export_pdf(
    user=Depends(require_role("ADMIN"))
):

    path = service.export("pdf")

    notification_service.create(

        user_id=user.id,

        title="Report exported",

        description="PDF report downloaded successfully.",

        type="report"

    )

    return FileResponse(
        path,
        filename="reviews.pdf",
        media_type="application/pdf"
    )