from fastapi import APIRouter
from app.ai.sentiment import SentimentDetector
from app.ai.summarizer import Summarizer
from app.ai.business_insights import BusinessInsights
from app.services.analytics_service import AnalyticsService
from app.services.dashboard_formatter import DashboardFormatter
from app.schemas.ai import BusinessInsightsResponse

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

@router.post("/summarize", response_model=SummarizeResponse)
def summarize(request: SummarizeRequest):
    return summarizer.summarize(request.text)

@router.post("/sentiment", response_model=SentimentResponse,)
def detect_sentiment(request: SentimentRequest):
    return sentiment.analyze(request.text)

@router.post("/business-insights", response_model=BusinessInsightsResponse,)
def business_insights():
    dashboard = analytics.get_dashboard()

    formatted = formatter.format(dashboard)

    return business.generate(formatted)