class DashboardFormatter:

    def format(
        self,
        dashboard: dict
    ) -> str:

        text = []

        text.append(
            f"Total Reviews: {dashboard['total_reviews']}"
        )

        text.append("\nSentiment Distribution:")

        text.append(
            f"- Positive: {dashboard['positive']}"
        )

        text.append(
            f"- Negative: {dashboard['negative']}"
        )

        text.append(
            f"- Mixed: {dashboard['mixed']}"
        )

        text.append("\nTop Emotions:")

        for emotion in dashboard["top_emotions"]:

            text.append(
                f"- {emotion['label']}: {emotion['count']}"
            )

        text.append("\nTop Categories:")

        for category in dashboard["top_categories"]:

            text.append(
                f"- {category['label']}: {category['count']}"
            )

        text.append("\nRecent Reviews:")

        for review in dashboard["recent_reviews"]:

            text.append(
                 f"- {review['review_text']} ({review['sentiment']})"
            )

        return "\n".join(text)