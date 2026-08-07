import re
import pandas as pd
from app.models.review import Review


class CSVLoader:

    def parse_rating(self, rating: str) -> float:
        """
        'Rated 4 out of 5 stars'
        ↓
        4.0
        """

        match = re.search(r"(\d+)", str(rating))

        if match:
            return float(match.group(1))

        return 0.0

    def load_reviews(self, file_path, limit=None) -> list[Review]:

        df = pd.read_csv(file_path, engine="python")

        if limit:
            df = df.head(limit)

        reviews = []

        for _, row in df.iterrows():

            review = Review(
                title=row["Review Title"],
                text=row["Review Text"],
                rating=self.parse_rating(row["Rating"]),
                reviewer=row["Reviewer Name"],
                country=row["Country"],
                review_date=row["Review Date"],
            )

            reviews.append(review)

        return reviews