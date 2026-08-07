import pandas as pd

from app.core.paths import EXPORT_DIR
from app.reports.base_report import BaseReport


class ExcelReport(BaseReport):

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

                "Keywords": review.keywords

            })

        df = pd.DataFrame(data)

        path = EXPORT_DIR / "reviews.xlsx"

        df.to_excel(
            path,
            index=False
        )

        return path