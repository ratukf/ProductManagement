import { api } from "../utils/api";

const authService = {
  // Log in service
  login: async (username, password) => {
    const res = await api.post("/auth/login", {
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
    const refreshToken = stored
      ? JSON.parse(stored)?.state?.refreshToken
      : null;
    const res = await api.post("/auth/refresh", {
      refreshToken,
      expiresInMins: 30,
    });
    return res.data;
  },
};

export { authService };
