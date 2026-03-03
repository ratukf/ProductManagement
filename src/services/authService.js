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
};

export { authService };
