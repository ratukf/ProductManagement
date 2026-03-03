import { Box, Typography } from "@mui/material";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const { user } = useAuthStore();
  return (
    <Box>
      <Typography variant="h4">
        Hello, {user.firstName} {user.lastName}
      </Typography>
    </Box>
  );
};

export default HomePage;
