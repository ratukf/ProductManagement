import axios from "axios";

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
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export { api };
