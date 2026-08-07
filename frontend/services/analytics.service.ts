import api from "@/lib/api";

export const AnalyticsService = {
    async getAnalytics() {
        const response = await api.get("/analytics/charts");
        return response.data;
    }
};