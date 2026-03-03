import { Box, Button, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, backTo, actions }) => {
  const nav = useNavigate();

  return (
    <Box sx={{ mb: 3 }}>
      {backTo && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<ArrowBack />}
          onClick={() => nav(backTo)}
          sx={{ mb: 1 }}
        >
          Back
        </Button>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">{title}</Typography>
        {actions && (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export { PageHeader };
