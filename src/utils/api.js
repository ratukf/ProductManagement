import axios from "axios";
import { refreshToken } from "../action/authAction";
import { useAuthStore } from "../store/authStore";

// Instance used for API calling
const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Run interceptor automatically before request sent by user
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("auth-storage");
  if (stored) {
    const parsed = JSON.parse(stored);
    const token = parsed?.state?.token;
    if (token) {
      // Automatically set header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

// Handler if response success or error
api.interceptors.response.use(
  // If success
  (response) => response,
  // If error
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const result = await refreshToken();

      if (result.success) {
        // Retry request with new token if successfuly refresh token
        const { token } = useAuthStore.getState();
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } else {
        // Logout if failed to refresh token
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export { api };
