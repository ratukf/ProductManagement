import { Box, Typography } from "@mui/material";
import { useAuthStore } from "../store/authStore";

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <Box>
      <Box>
        <Typography variant="h4">
          Hello, {user?.firstName} {user?.lastName}
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
