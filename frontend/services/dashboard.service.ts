import api from "./api";

export const DashboardService = {
  async getDashboard() {
    const response = await api.get("/dashboard");
    return response.data;
  },
};