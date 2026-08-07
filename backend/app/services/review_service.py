from app.repositories.review_repository import ReviewRepository
from app.analyzers.review_analyzer import ReviewAnalyzer
from app.mappers.review_mapper import ReviewMapper
import logging

logger = logging.getLogger(__name__)

class ReviewService:

    def __init__(self):

        self.analyzer = ReviewAnalyzer()
        self.repository = ReviewRepository()

    def analyze_review(self, review: str):

        logger.info("Review analysis started.")

        try:

            analysis = self.analyzer.analyze(review)

            entity = ReviewMapper.to_entity(
                review,
                analysis,
                prompt_version="v1"
            )

            self.repository.save(entity)

            logger.info("Review analysis completed.")

            return analysis

        except Exception:

            logger.exception("Review analysis failed.")

            raise

    def analyze_batch(self, reviews):

        results = []

        for review in reviews:

            result = self.analyzer.analyze(
                review.text
            )

            results.append(result)

        return results
    
    def get_reviews(
        self,
        page,
        page_size,
        sentiment=None,
        emotion=None,
        search=None,
        category=None,
        keyword=None,
        sort="id",
        order="desc"
    ):

        return self.repository.get_reviews(

            page,

            page_size,

            sentiment,

            emotion,

            search,

            category,

            keyword,

            sort,

            order

        )
    
    def get_review(self, review_id: int):

        return self.repository.get_by_id(review_id)