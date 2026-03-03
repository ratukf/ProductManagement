import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";
import { useSnackbarStore } from "../store/snackbarStore";

// Snackbar
const { show } = useSnackbarStore.getState();

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
    show("Successfully get user data");
    return { success: true };
  } catch (err) {
    // Set error and loading if failed
    setError(err.response?.data?.message || "Login failed");
    setLoading(false);
    show("Failed to get user data", "error");
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

// Log out
const logout = () => {
  const { clearAuth } = useAuthStore.getState();
  clearAuth();
};

// Refresh token
const refreshToken = async () => {
  const { setLoading, setError, setToken } = useAuthStore.getState();

  // Set refresh token state while loading
  setLoading(true);
  setError(null);

  try {
    const data = await authService.refreshToken();
    // Set token and loading while loading refresh token
    setToken(data.accessToken);
    setLoading(false);
    return { success: true };
  } catch (err) {
    // Set error and loading while failed to refresh token
    setError(err.response?.data?.message || "Failed to refresh token");
    setLoading(false);
    return { success: false };
  }
};

export { login, getUser, logout, refreshToken };
