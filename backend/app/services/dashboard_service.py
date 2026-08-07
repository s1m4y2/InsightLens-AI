from app.repositories.review_repository import ReviewRepository


class DashboardService:

    def __init__(self):

        self.repository = ReviewRepository()

    def get_dashboard(self):

        return {

            "total_reviews": self.repository.count(),

            "positive": self.repository.count_by_sentiment(
                "Positive"
            ),

            "negative": self.repository.count_by_sentiment(
                "Negative"
            ),

            "mixed": self.repository.count_by_sentiment(
                "Mixed"
            ),

            "top_emotions": self.repository.top_emotions(),

            "top_categories": self.repository.top_categories(),

            "recent_reviews": self.repository.latest()

        }