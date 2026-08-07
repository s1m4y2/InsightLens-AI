import { ReportService } from "@/services/report.service";

export function useReportExport() {

    const download = async (
        type: "pdf" | "excel" | "csv"
    ) => {

        let response;

        switch (type) {

            case "pdf":
                response = await ReportService.exportPdf();
                break;

            case "excel":
                response = await ReportService.exportExcel();
                break;

            case "csv":
                response = await ReportService.exportCsv();
                break;

        }

        const url = window.URL.createObjectURL(response.data);

        const link = document.createElement("a");

        link.href = url;

        const today = new Date().toISOString().split("T")[0];

        link.download = `reviews-${today}.${type === "excel" ? "xlsx" : type}`;

        link.click();

        window.URL.revokeObjectURL(url);

    };

    return { download };

}