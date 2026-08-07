import api from "@/lib/api";

export const BusinessService = {
    async getInsights() {
        const response = await api.post(
            "/ai/business-insights"
        );

        return response.data;
    }
};