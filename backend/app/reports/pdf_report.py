from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

from app.core.paths import EXPORT_DIR
from app.reports.base_report import BaseReport


class PDFReport(BaseReport):

    def generate(self, reviews):

        path = EXPORT_DIR / "reviews.pdf"

        document = SimpleDocTemplate(str(path))

        styles = getSampleStyleSheet()

        elements = []

        elements.append(
            Paragraph(
                "InsightLens AI Report",
                styles["Heading1"]
            )
        )

        for review in reviews:

            elements.append(
                Paragraph(
                    f"<b>ID:</b> {review.id}",
                    styles["BodyText"]
                )
            )

            elements.append(
                Paragraph(
                    review.review_text,
                    styles["BodyText"]
                )
            )

            elements.append(
                Paragraph(
                    f"Sentiment: {review.sentiment}",
                    styles["BodyText"]
                )
            )

            elements.append(
                Paragraph(
                    f"Emotion: {review.emotion}",
                    styles["BodyText"]
                )
            )

            elements.append(
                Paragraph(
                    "<br/>",
                    styles["BodyText"]
                )
            )

        document.build(elements)

        return path