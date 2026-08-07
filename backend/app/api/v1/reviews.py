from fastapi import APIRouter
from app.schemas.review import (ReviewListResponse, ReviewRequest, ReviewAnalysisResponse,)
from app.loaders.csv_loader import CSVLoader
from app.core.paths import DATASET_DIR
from app.services.review_service import ReviewService
from app.services.batch_analysis_service import BatchAnalysisService
from fastapi import Query
from fastapi import Depends
from app.security.dependencies import (get_current_user)

router = APIRouter(prefix="/api/v1/reviews", tags=["Reviews"],)
loader = CSVLoader()
service = ReviewService()
batch_service = BatchAnalysisService()

@router.post("/analyze", response_model=ReviewAnalysisResponse)
def analyze_review(request: ReviewRequest, user = Depends(get_current_user)):
    return service.analyze_review(request.review)

@router.post("/analyze-dataset")
def analyze_dataset(
    user=Depends(get_current_user)
):

    reviews = loader.load_reviews(
        DATASET_DIR / "amazon_reviews.csv",
        limit=5
    )

    results = service.analyze_batch(reviews)

    return {
        "processed": len(results),
        "results": results
    }

@router.get("/dataset/info")
def dataset_info(user=Depends(get_current_user)):

    reviews = loader.load_reviews(DATASET_DIR / "amazon_reviews.csv")

    first_review = reviews[0]

    return {
        "total_reviews": len(reviews),
        "first_review": first_review.__dict__,
    }

@router.post("/analyze-all")
def analyze_all(
    user=Depends(get_current_user)
):
    return batch_service.analyze_dataset(limit=10)

@router.get("/{review_id}")
def get_review(review_id: int, user=Depends(get_current_user)):
    return service.get_review(review_id)

@router.get(
    "",
    response_model=ReviewListResponse
)
def get_reviews(
    user=Depends(get_current_user),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    sentiment: str | None = Query(None),
    emotion: str | None = Query(None),
    search: str | None = Query(None),
    category: str | None = None,
    keyword: str | None = None,
    sort: str = "id",
    order: str = "desc"
):

    return service.get_reviews(
        page,
        page_size,
        sentiment,
        emotion,
        search,
        category,
        keyword,
        sort,
        order
    )