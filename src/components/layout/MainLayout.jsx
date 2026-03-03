import { useState } from "react";
import { Alert, Box, Snackbar, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar, DRAWER_WIDTH } from "./Sidebar";
import { Navbar } from "./Navbar";
import { useSnackbarStore } from "../../store/snackbarStore";

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open, message, severity, hide } = useSnackbarStore();
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={hide}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={hide} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Box sx={{ display: "flex" }}>
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            p: 3,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { md: `${DRAWER_WIDTH}px` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export { MainLayout };
