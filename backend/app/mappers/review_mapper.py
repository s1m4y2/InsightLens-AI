from app.entities.review_analysis_entity import ReviewAnalysisEntity


class ReviewMapper:

    @staticmethod
    def to_entity(
        review_text: str,
        analysis: dict,
        prompt_version="v1"
    ) -> ReviewAnalysisEntity:

        return ReviewAnalysisEntity(

            review_text=review_text,

            prompt_version=prompt_version,

            summary=analysis.get("summary"),

            sentiment=analysis.get("sentiment"),

            emotion=analysis.get("emotion"),

            categories=analysis.get("categories", []),

            keywords=analysis.get("keywords", []),

            confidence=analysis.get("confidence"),

            rating=analysis.get("rating"),

            suggested_reply=analysis.get("suggested_reply"),
        )