import { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAuthStore } from "../../store/authStore";
import { getUser } from "../../action/authAction";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const hasFetched = useRef(false);

  // Fetch user data if authenticated
  useEffect(() => {
    if (isAuthenticated() && !hasFetched.current) {
      hasFetched.current = true;
      getUser();
    }
  }, []);

  // Loading component
  if (isLoading) return <CircularProgress />;

  // Automatically return to login page if not authenticated
  if (!isAuthenticated()) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
