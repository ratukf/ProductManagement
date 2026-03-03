import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";

// Login async action
const login = async (username, password) => {
  const { setLoading, setError, setUser, setToken } = useAuthStore.getState();

  // Set auth state while loading
  setLoading(true);
  setError(null);

  try {
    const data = await authService.login(username, password);
    // Set user, token, and loading while success
    setUser({
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    });
    setToken(data.accessToken);
    setLoading(false);
    return { success: true };
  } catch (err) {
    // Set error and loading if failed
    setError(err.response?.data?.message || "Login failed");
    setLoading(false);
    return { success: false };
  }
};

// Get user data async action
const getUser = async () => {
  const { setLoading, setError, setUser } = useAuthStore.getState();

  // Set get user state while loading
  setLoading(true);
  setError(null);

  try {
    const data = await authService.getUser();
    // Set user and loading state while success
    setUser({
      id: data.id,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      image: data.image,
    });
    setLoading(false);
    return { success: true };
  } catch (err) {
    // Set error and loading state while failed
    setError(err.response?.data?.message || "Failed to fetch user");
    setLoading(false);
    return { success: false };
  }
};

export { login, getUser };
