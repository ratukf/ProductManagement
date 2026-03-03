import { api } from "../utils/api";

const authService = {
  // Log in service
  login: async (username, password) => {
    const res = await api.post("auth/login", {
      username,
      password,
    });
    return res.data;
  },
  // Get user data service
  getUser: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};

export { authService };
