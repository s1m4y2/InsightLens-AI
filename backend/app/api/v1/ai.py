from fastapi import APIRouter, Depends
from app.ai.sentiment import SentimentDetector
from app.ai.summarizer import Summarizer
from app.ai.business_insights import BusinessInsights
from app.services.analytics_service import AnalyticsService
from app.services.dashboard_formatter import DashboardFormatter
from app.schemas.ai import BusinessInsightsResponse
from app.security.dependencies import get_current_user
from app.services.notification_service import NotificationService
from app.schemas.ai import (
    SummarizeRequest,
    SummarizeResponse,
    SentimentRequest,
    SentimentResponse
)

router = APIRouter(

    prefix="/api/v1/ai",

    tags=["AI"]

)

summarizer = Summarizer()
sentiment = SentimentDetector()
analytics = AnalyticsService()
formatter = DashboardFormatter()
business = BusinessInsights()
notification_service = NotificationService()

@router.post(
    "/summarize",
    response_model=SummarizeResponse
)
def summarize(
    request: SummarizeRequest,
    user=Depends(get_current_user)
):

    result = summarizer.summarize(
        request.text
    )

    notification_service.create(

        user_id=user.id,

        title="AI Summary completed",

        description="Customer review summary generated successfully.",

        type="ai"

    )

    return result

@router.post(
    "/sentiment",
    response_model=SentimentResponse,
)
def detect_sentiment(
    request: SentimentRequest,
    user=Depends(get_current_user)
):

    result = sentiment.analyze(
        request.text
    )

    notification_service.create(

        user_id=user.id,

        title="Sentiment analysis completed",

        description="Customer review sentiment analyzed successfully.",

        type="ai"

    )

    return result

@router.post(
    "/business-insights",
    response_model=BusinessInsightsResponse,
)
def business_insights(
    user=Depends(get_current_user)
):

    dashboard = analytics.get_dashboard()

    formatted = formatter.format(
        dashboard
    )

    result = business.generate(
        formatted
    )

    notification_service.create(

        user_id=user.id,

        title="Business insights generated",

        description="AI business insights generated successfully.",

        type="ai"

    )

    return result