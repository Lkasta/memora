import axios from "axios";
import { publicRoutes } from "@/utils/routes";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // On public routes (login/register) a 401 just means "wrong credentials"
    // for that request - not an expired session - so don't force a redirect.
    if (
      error.response?.status === 401 &&
      !publicRoutes.includes(window.location.pathname)
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
