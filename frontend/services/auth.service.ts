import api from "@/lib/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export const AuthService = {
  async login(request: LoginRequest) {
    const response = await api.post("/auth/login", request);

    localStorage.setItem(
      "access_token",
      response.data.access_token
    );

    return response.data;
  },

  logout() {
    localStorage.removeItem("access_token");
  },

  getToken() {
    return localStorage.getItem("access_token");
  },
};