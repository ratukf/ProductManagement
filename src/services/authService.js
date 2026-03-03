import axios from "axios";
import { api } from "../utils/api";

const authService = {
  // Log in service
  login: async (username, password) => {
    const res = await api.post("auth/login", {
      username,
      password,
      expiresInMins: 30,
    });
    return res.data;
  },
  // Get user data service
  getUser: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
  // Refresh token
  refreshToken: async () => {
    const stored = localStorage.getItem("auth-storage");
    const token = stored ? JSON.parse(stored)?.state?.token : null;
    const res = await axios.get("https://dummyjson.com/auth/refresh", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};

export { authService };
