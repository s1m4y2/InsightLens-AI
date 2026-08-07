from app.core.paths import DATASET_DIR
from app.loaders.csv_loader import CSVLoader
from app.analyzers.review_analyzer import ReviewAnalyzer
from app.repositories.review_repository import ReviewRepository
from app.mappers.review_mapper import ReviewMapper

class BatchAnalysisService:

    def __init__(self):

        self.loader = CSVLoader()
        self.analyzer = ReviewAnalyzer()
        self.mapper = ReviewMapper()
        self.repository = ReviewRepository()

    def analyze_dataset(self, limit=10):

        reviews = self.loader.load_reviews(DATASET_DIR / "amazon_reviews.csv")

        reviews = reviews[:limit]

        processed = 0
        skipped = 0

        for review in reviews:
            if self.repository.exists_by_review_text(review.text):
                skipped += 1
                continue

            analysis = self.analyzer.analyze(review.text)

            entity = self.mapper.to_entity(review.text, analysis)

            self.repository.save(entity)

            processed += 1

        return {
            "total": len(reviews),
            "processed": processed,
            "skipped": skipped
        }