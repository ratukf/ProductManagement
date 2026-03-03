import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { DRAWER_WIDTH } from "./Sidebar";

const pageTitles = {
  "/dashboard": "Home",
  "/products": "Products",
  "/products/add": "Add Product",
};

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.match(/^\/products\/\d+\/edit$/))
      return "Edit Product";
    if (location.pathname.match(/^\/products\/\d+$/)) return "Product Detail";
    return pageTitles[location.pathname] || "Dashboard";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6">{getTitle()}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
