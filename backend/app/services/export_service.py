from app.repositories.review_repository import ReviewRepository
import pandas as pd


class ExportService:

    def __init__(self):

        self.repository = ReviewRepository()

    def export_csv(self):

        reviews = self.repository.get_reviews(
            page=1,
            page_size=100000
        )["items"]

        data = []

        for review in reviews:

            data.append({

                "id": review.id,

                "review": review.review_text,

                "summary": review.summary,

                "sentiment": review.sentiment,

                "emotion": review.emotion,

                "categories": review.categories,

                "keywords": review.keywords

            })

        df = pd.DataFrame(data)

        path = "exports/reviews.csv"

        df.to_csv(
            path,
            index=False
        )

        return path
    
    def export_excel(self):

        reviews = self.repository.get_reviews(
            page=1,
            page_size=100000
        )["items"]

        data = []

        for review in reviews:

            data.append({

                "id": review.id,

                "review": review.review_text,

                "summary": review.summary,

                "sentiment": review.sentiment,

                "emotion": review.emotion,

                "categories": review.categories,

                "keywords": review.keywords

            })

        df = pd.DataFrame(data)

        path = "exports/reviews.xlsx"

        df.to_excel(
            path,
            index=False
        )

        return path