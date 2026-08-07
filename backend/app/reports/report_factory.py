from app.reports.csv_report import CSVReport
from app.reports.excel_report import ExcelReport
from app.reports.pdf_report import PDFReport


class ReportFactory:

    @staticmethod
    def create(report_type: str):

        if report_type == "csv":
            return CSVReport()

        if report_type == "excel":
            return ExcelReport()

        if report_type == "pdf":
            return PDFReport()

        raise Exception("Unknown report type.")