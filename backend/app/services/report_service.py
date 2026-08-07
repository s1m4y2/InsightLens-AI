from app.reports.report_factory import ReportFactory
from app.repositories.review_repository import ReviewRepository


class ReportService:

    def __init__(self):

        self.repository = ReviewRepository()
    
    def export(
        self,
        report_type: str
    ):

        reviews = self.repository.get_reviews(
            page=1,
            page_size=100000
        )["items"]

        report = ReportFactory.create(
            report_type
        )

        return report.generate(
            reviews
        )