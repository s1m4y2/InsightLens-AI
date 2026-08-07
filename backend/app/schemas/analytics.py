from pydantic import BaseModel
from datetime import datetime

class SentimentResponse(BaseModel):
    sentiments: dict[str, int]


class EmotionResponse(BaseModel):
    emotions: dict[str, int]

class CategoryResponse(BaseModel):

    categories: dict[str, int]

class KeywordResponse(BaseModel):

    keywords: dict[str, int]

class ChartItem(BaseModel):

    label: str

    count: int

class DashboardRecentReview(BaseModel):

    id: int

    review_text: str

    summary: str

    sentiment: str

    emotion: str

    created_at: datetime
    
class DashboardResponse(BaseModel):

    total_reviews: int

    positive: int

    negative: int

    mixed: int

    top_emotions: list[ChartItem]

    top_categories: list[ChartItem]

    recent_reviews: list[DashboardRecentReview]

class TrendItem(BaseModel):

    date: str

    count: int

class AnalyticsResponse(BaseModel):

    sentiment_chart: list[ChartItem]

    emotion_chart: list[ChartItem]

    category_chart: list[ChartItem]

    keyword_chart: list[ChartItem]

    review_trend: list[TrendItem]

