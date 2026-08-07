from datetime import datetime
from collections import Counter
from pathlib import Path
from reportlab.platypus import PageBreak
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Table,
    TableStyle,
    Spacer,
    Flowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.charts.barcharts import HorizontalBarChart
from reportlab.platypus import Image
from app.core.paths import EXPORT_DIR
from app.reports.base_report import BaseReport


SENTIMENT_COLORS = {
    "Positive": {
        "text": colors.HexColor("#16A34A"),
        "bg": colors.HexColor("#DCFCE7"),
    },
    "Negative": {
        "text": colors.HexColor("#DC2626"),
        "bg": colors.HexColor("#FEE2E2"),
    },
    "Mixed": {
        "text": colors.HexColor("#D97706"),
        "bg": colors.HexColor("#FEF3C7"),
    },
}

BRAND_COLOR = colors.HexColor("#4338CA")
MUTED_COLOR = colors.HexColor("#64748B")
BORDER_COLOR = colors.HexColor("#E2E8F0")


class NumberedCanvas(pdfcanvas.Canvas):
    """Sayfa altına 'Page X / Y' ve marka adını basan canvas."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        total_pages = len(self._saved_page_states)

        for state in self._saved_page_states:
            self.__dict__.update(state)
            self._draw_footer(total_pages)
            super().showPage()

        super().save()

    def _draw_footer(self, total_pages):
        page_num = self._pageNumber

        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.5)
        self.line(2 * cm, 1.6 * cm, self._pagesize[0] - 2 * cm, 1.6 * cm)

        self.setFont("DejaVu", 8)
        self.setFillColor(colors.grey)

        self.drawString(2 * cm, 1.1 * cm, "InsightLens AI")

        self.drawRightString(
            self._pagesize[0] - 2 * cm,
            1.1 * cm,
            f"Page {page_num} / {total_pages}",
        )


class PDFReport(BaseReport):

    def generate(self, reviews):
        FONT_PATH = (
            Path(__file__).resolve().parent.parent.parent
            / "assets"
            / "fonts"
            / "DejaVuSans.ttf"
        )
        LOGO_PATH = (
            Path(__file__).resolve().parent.parent.parent
            / "assets"
            / "images"
            / "logo.png"
        )
        pdfmetrics.registerFont(
            TTFont("DejaVu", str(FONT_PATH))
        )

        path = EXPORT_DIR / "reviews.pdf"

        document = SimpleDocTemplate(
            str(path),
            topMargin=2 * cm,
            bottomMargin=2.4 * cm,
        )

        styles = getSampleStyleSheet()

        elements = []

        # ---------- Header ----------

        heading = styles["Heading1"]
        heading.fontName = "DejaVu"
        heading.fontSize = 18
        heading.textColor = BRAND_COLOR
        heading.spaceAfter = 4

        generated_style = ParagraphStyle(
            "Generated",
            fontName="DejaVu",
            fontSize=9,
            textColor=MUTED_COLOR,
            spaceAfter=20,
        )

        logo = Image(str(LOGO_PATH))
        logo.drawHeight = 2.2 * cm
        logo.drawWidth = 2.2 * cm

        header_table = Table(
            [[
                logo,
                Paragraph(
                    "InsightLens AI<br/>"
                    "<font size='10' color='#64748B'>AI Customer Review Analytics</font>",
                    ParagraphStyle(
                        "HeaderTitle",
                        fontName="DejaVu",
                        fontSize=20,
                        textColor=BRAND_COLOR,
                        leading=24,
                    ),
                ),
            ]],
            colWidths=[2.8 * cm, 13.2 * cm],
        )

        header_table.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]))

        elements.append(header_table)
        elements.append(Spacer(1, 10))

        generated_at = datetime.now().strftime("%d %b %Y, %H:%M")

        elements.append(
            Paragraph(f"Generated at: {generated_at}", generated_style)
        )

        elements.append(
            Table(
                [[""]],
                colWidths=[16 * cm],
                style=TableStyle([
                    ("LINEBELOW", (0, 0), (-1, -1), 1, BORDER_COLOR),
                ])
            )
        )

        elements.append(Spacer(1, 18))

        # ---------- Executive Summary ----------

        elements.append(Paragraph("Executive summary", heading))
        elements.append(Spacer(1, 6))

        positive = [r for r in reviews if r.sentiment == "Positive"]
        negative = [r for r in reviews if r.sentiment == "Negative"]
        mixed = [r for r in reviews if r.sentiment == "Mixed"]

        ratings = [
            r.rating for r in reviews if getattr(r, "rating", None) is not None
        ]
        avg_rating = f"{sum(ratings) / len(ratings):.1f} / 5" if ratings else "N/A"

        confidences = [
            r.confidence for r in reviews if getattr(r, "confidence", None) is not None
        ]
        avg_confidence = (
            f"{sum(confidences) / len(confidences):.0f}%" if confidences else "N/A"
        )

        emotion_counts = Counter(
            r.emotion for r in reviews if getattr(r, "emotion", None)
        )
        most_common_emotion = (
            emotion_counts.most_common(1)[0][0] if emotion_counts else "N/A"
        )

        category_counts = Counter(
            c for r in reviews for c in (r.categories or [])
        )
        most_common_category = (
            category_counts.most_common(1)[0][0] if category_counts else "N/A"
        )

        label_style = ParagraphStyle(
            "SummaryLabel", fontName="DejaVu", fontSize=10, textColor=MUTED_COLOR,
        )
        value_style = ParagraphStyle(
            "SummaryValue", fontName="DejaVu", fontSize=11, textColor=colors.HexColor("#0F172A"),
        )

        def _stat(label, value):
            return [Paragraph(label, label_style), Paragraph(str(value), value_style)]

        summary = Table(
            [
                _stat("Total reviews", len(reviews)),
                _stat("Positive", len(positive)),
                _stat("Negative", len(negative)),
                _stat("Mixed", len(mixed)),
                _stat("Average rating", avg_rating),
                _stat("Average confidence", avg_confidence),
                _stat("Most common emotion", most_common_emotion),
                _stat("Most common category", most_common_category),
            ],
            colWidths=[7 * cm, 6 * cm],
        )

        summary.setStyle(
            TableStyle([
                ("LINEBELOW", (0, 0), (-1, -2), 0.5, BORDER_COLOR),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LEFTPADDING", (0, 0), (0, -1), 0),
            ])
        )

        elements.append(summary)
        elements.append(Spacer(1, 20))

        # ---------- AI Executive Insights ----------

        elements.append(Paragraph("Executive AI insights", heading))
        elements.append(Spacer(1, 6))

        insights = self._build_ai_insights(
            reviews, positive, negative, mixed, category_counts
        )

        insight_style = ParagraphStyle(
            "Insight",
            fontName="DejaVu",
            fontSize=10.5,
            leading=17,
            textColor=colors.HexColor("#1E293B"),
        )

        insight_rows = [
            [Paragraph(f"<font color='#4338CA'>●</font>  {line}", insight_style)]
            for line in insights
        ]

        insight_box = Table(insight_rows, colWidths=[16 * cm])

        insight_box.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F5F5FF")),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ("LEFTPADDING", (0, 0), (-1, -1), 14),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#E0E0FF")),
        ]))

        elements.append(insight_box)
        elements.append(Spacer(1, 20))

        # ---------- Review cards ----------

        elements.append(PageBreak())
        elements.append(Paragraph("Reviews", heading))
        elements.append(Spacer(1, 10))

        review_label_style = ParagraphStyle(
            "ReviewLabel", fontName="DejaVu", fontSize=9, textColor=MUTED_COLOR,
        )
        review_value_style = ParagraphStyle(
            "ReviewValue", fontName="DejaVu", fontSize=10.5, textColor=colors.HexColor("#0F172A"),
        )

        for review in reviews:

            sentiment_style = SENTIMENT_COLORS.get(
                review.sentiment,
                {"text": colors.black, "bg": colors.whitesmoke},
            )

            sentiment_badge = Paragraph(
                f"<font color='{sentiment_style['text'].hexval()}'>●</font> "
                f"<font color='{sentiment_style['text'].hexval()}'><b>{review.sentiment}</b></font>",
                review_value_style,
            )

            card_rows = [
                [Paragraph("ID", review_label_style), Paragraph(str(review.id), review_value_style)],
                [Paragraph("Review", review_label_style), Paragraph(review.review_text, review_value_style)],
                [Paragraph("Sentiment", review_label_style), sentiment_badge],
                [Paragraph("Emotion", review_label_style), Paragraph(review.emotion, review_value_style)],
                [Paragraph("Categories", review_label_style), Paragraph(", ".join(review.categories or []), review_value_style)],
                [Paragraph("Keywords", review_label_style), Paragraph(", ".join(review.keywords or []), review_value_style)],
            ]

            inner = Table(card_rows, colWidths=[3.4 * cm, 12.1 * cm])

            inner.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("LINEBELOW", (0, 0), (-1, -2), 0.5, BORDER_COLOR),
            ]))

            # Kartın soluna sentiment rengiyle vurgu şeridi + dış çerçeve
            card = Table([[inner]], colWidths=[16 * cm])

            card.setStyle(TableStyle([
                ("BOX", (0, 0), (-1, -1), 0.5, BORDER_COLOR),
                ("LINEBEFORE", (0, 0), (0, -1), 3, sentiment_style["text"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
            ]))

            elements.append(card)
            elements.append(Spacer(1, 14))

        # ---------- Sentiment distribution chart ----------

        elements.append(PageBreak())
        elements.append(Paragraph("Sentiment distribution", heading))
        elements.append(Spacer(1, 12))
        elements.append(
            self._build_sentiment_chart(len(positive), len(negative), len(mixed))
        )

        document.build(elements, canvasmaker=NumberedCanvas)

        return path

    def _build_ai_insights(self, reviews, positive, negative, mixed, category_counts):
        """
        Basit kural tabanlı özet üretici.
        İleride buranın yerine gerçek bir LLM çağrısı (örn. review özetleyici servis)
        bağlanabilir; fonksiyon imzası aynı kalırsa generate() değişmez.
        """

        if not reviews:
            return ["No reviews available for this period."]

        insights = []

        total = len(reviews)
        negative_ratio = len(negative) / total
        positive_ratio = len(positive) / total

        if negative_ratio >= 0.5:
            insights.append("Customer sentiment is mostly negative.")
        elif positive_ratio >= 0.5:
            insights.append("Customer sentiment is mostly positive.")
        else:
            insights.append("Customer sentiment is mixed across reviews.")

        if category_counts:
            top_categories = category_counts.most_common(2)

            def _mention_word(count):
                return "mention" if count == 1 else "mentions"

            insights.append(
                f"{top_categories[0][0]} is the dominant issue "
                f"({top_categories[0][1]} {_mention_word(top_categories[0][1])})."
            )

            if len(top_categories) > 1:
                insights.append(
                    f"{top_categories[1][0]} is the second largest area of concern "
                    f"({top_categories[1][1]} {_mention_word(top_categories[1][1])})."
                )

        if negative_ratio >= 0.5:
            insights.append("Immediate action is recommended to address recurring complaints.")
        else:
            insights.append("Overall performance is stable; continue monitoring recurring themes.")

        return insights

    def _build_sentiment_chart(self, positive, negative, mixed):

        max_value = max(positive, mixed, negative, 1)

        drawing = Drawing(460, 170)

        chart = HorizontalBarChart()
        chart.x = 90
        chart.y = 30
        chart.height = 110
        chart.width = 320

        chart.data = [[positive], [mixed], [negative]]
        chart.categoryAxis.categoryNames = ["Positive", "Mixed", "Negative"]
        chart.categoryAxis.labels.fontName = "DejaVu"
        chart.categoryAxis.labels.fontSize = 9
        chart.categoryAxis.strokeColor = BORDER_COLOR

        chart.valueAxis.valueMin = 0
        chart.valueAxis.valueMax = max_value + 1
        chart.valueAxis.valueStep = 1
        chart.valueAxis.labels.fontName = "DejaVu"
        chart.valueAxis.labels.fontSize = 8
        chart.valueAxis.strokeColor = BORDER_COLOR
        chart.valueAxis.visibleGrid = True
        chart.valueAxis.gridStrokeColor = BORDER_COLOR
        chart.valueAxis.gridStrokeWidth = 0.4

        chart.barWidth = 16
        chart.groupSpacing = 14
        chart.barLabelFormat = "%d"
        chart.barLabels.fontName = "DejaVu"
        chart.barLabels.fontSize = 9
        chart.barLabels.nudge = 8

        chart.bars.strokeColor = None
        chart.bars[(0, 0)].fillColor = colors.HexColor("#16A34A")
        chart.bars[(1, 0)].fillColor = colors.HexColor("#D97706")
        chart.bars[(2, 0)].fillColor = colors.HexColor("#DC2626")

        drawing.add(chart)

        legend_style = ParagraphStyle(
            "Legend",
            fontName="DejaVu",
            fontSize=9.5,
            textColor=colors.HexColor("#334155"),
        )

        legend = Table(
            [[
                Paragraph("<font color='#16A34A'>●</font> Positive", legend_style),
                Paragraph("<font color='#D97706'>●</font> Mixed", legend_style),
                Paragraph("<font color='#DC2626'>●</font> Negative", legend_style),
            ]],
            colWidths=[4 * cm, 4 * cm, 4 * cm],
        )

        wrapper = Table(
            [[drawing], [legend]],
            colWidths=[16 * cm],
        )

        wrapper.setStyle(TableStyle([
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("TOPPADDING", (0, 1), (-1, 1), 10),
        ]))

        return wrapper