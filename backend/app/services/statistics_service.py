from app.repositories.review_repository import ReviewRepository


class StatisticsService:

    def __init__(self):

        self.repository = ReviewRepository()

    def get_statistics(self):

        total = self.repository.count()

        positive = self.repository.count_by_sentiment(
            "Positive"
        )

        negative = self.repository.count_by_sentiment(
            "Negative"
        )

        mixed = self.repository.count_by_sentiment(
            "Mixed"
        )

        return {

            "total_reviews": total,

            "positive_reviews": positive,

            "negative_reviews": negative,

            "mixed_reviews": mixed,

            "positive_percentage": round(
                positive / total * 100,
                2
            ) if total else 0,

            "negative_percentage": round(
                negative / total * 100,
                2
            ) if total else 0,

            "mixed_percentage": round(
                mixed / total * 100,
                2
            ) if total else 0,

            "average_review_length":
                self.repository.average_review_length()
        }