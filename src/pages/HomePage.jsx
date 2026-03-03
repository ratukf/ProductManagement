import { Box, Button, Typography } from "@mui/material";
import { useAuthStore } from "../store/authStore";
import { useLogout } from "../hooks/useLogout";

const HomePage = () => {
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();

  return (
    <Box>
      <Typography variant="h4">
        Hello, {user?.firstName} {user?.lastName}
      </Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default HomePage;
