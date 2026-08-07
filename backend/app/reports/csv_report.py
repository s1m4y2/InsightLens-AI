import pandas as pd

from app.core.paths import EXPORT_DIR
from app.reports.base_report import BaseReport


class CSVReport(BaseReport):

    def generate(self, reviews):

        data = []

        for review in reviews:

            data.append({

                "ID": review.id,
                "Review": review.review_text,
                "Summary": review.summary,
                "Sentiment": review.sentiment,
                "Emotion": review.emotion,
                "Categories": review.categories,
                "Keywords": review.keywords,
                "Suggested Reply": review.suggested_reply

            })

        df = pd.DataFrame(data)

        EXPORT_DIR.mkdir(exist_ok=True)

        path = EXPORT_DIR / "reviews.csv"

        df.to_csv(
            path,
            index=False,
            encoding="utf-8-sig"
        )

        return path