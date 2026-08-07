from fastapi import APIRouter
from fastapi.responses import FileResponse
from fastapi import Depends
from app.security.roles import require_role
from app.services.report_service import ReportService

router = APIRouter(
    prefix="/api/v1/reports",
    tags=["Reports"]
)

service = ReportService()


@router.get("/csv", summary="Export reviews as CSV")
def export_csv(user=Depends(require_role("ADMIN"))):

    path = service.export("csv")

    return FileResponse(
        path,
        filename="reviews.csv",
        media_type="text/csv"
    )


@router.get("/excel", summary="Export reviews as Excel")
def export_excel(user=Depends(require_role("ADMIN"))):
    
    path = service.export("excel")

    return FileResponse(
        path,
        filename="reviews.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


@router.get("/pdf", summary="Export reviews as PDF")
def export_pdf(user=Depends(require_role("ADMIN"))):

    path = service.export("pdf")

    return FileResponse(
        path,
        filename="reviews.pdf",
        media_type="application/pdf"
    )