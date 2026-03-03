import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuthStore } from "../store/authStore";
import { useLogout } from "../hooks/useLogout";
import ProductsPage from "./ProductsPage";

const HomePage = () => {
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();

  return (
    <Box>
      <Box>
        <Typography variant="h4">
          Hello, {user?.firstName} {user?.lastName}
        </Typography>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </Box>
  );
};

export default HomePage;
