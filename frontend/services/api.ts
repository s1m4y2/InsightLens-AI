import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {

        if (typeof window !== "undefined") {

            const token =
                localStorage.getItem("access_token");

            if (token) {

                config.headers.Authorization =
                    `Bearer ${token}`;

            }

        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default api;