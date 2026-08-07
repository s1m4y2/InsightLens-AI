import api from "@/lib/api";

export const ReportService = {

    exportPdf() {
        return api.get("/reports/pdf", {
            responseType: "blob",
        });
    },

    exportExcel() {
        return api.get("/reports/excel", {
            responseType: "blob",
        });
    },

    exportCsv() {
        return api.get("/reports/csv", {
            responseType: "blob",
        });
    },

};