from app.repositories.review_repository import ReviewRepository
from collections import Counter


class AnalyticsService:

    def __init__(self):

        self.repository = ReviewRepository()

    def get_dashboard(self):

        return {

            "total_reviews": self.repository.count(),

            "positive": self.repository.count_by_sentiment("Positive"),

            "negative": self.repository.count_by_sentiment("Negative"),

            "mixed": self.repository.count_by_sentiment("Mixed"),

            "top_emotions": self.repository.top_emotions(),

            "top_categories": self.repository.top_categories(),

            "recent_reviews": self.repository.latest()

        }

    def get_analytics(self):

        return {

            "sentiment_chart":
                self.repository.sentiment_distribution(),

            "emotion_chart":
                self.repository.emotion_distribution(),

            "category_chart":
                self.repository.category_distribution(),

            "keyword_chart":
                self.repository.keyword_distribution(),

            "review_trend":
                self.repository.review_trend(),

        }