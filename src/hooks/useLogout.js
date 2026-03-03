import { useNavigate } from "react-router-dom";
import { logout } from "../action/authAction";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return { handleLogout };
};

export { useLogout };
