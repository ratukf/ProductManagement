import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Home, Inventory, Logout } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthStore } from "../../store/authStore";

const DRAWER_WIDTH = 240;

const menuItems = [
  { label: "Home", icon: <Home />, path: "/dashboard" },
  { label: "Products", icon: <Inventory />, path: "/products" },
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useLogout();
  const user = useAuthStore((state) => state.user);

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const content = (
    <Box>
      <Box>
        <Typography variant="subtitle1">
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="caption">@{user?.username}</Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map(({ label, icon, path }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              selected={location.pathname === path}
              onClick={() => handleNavigate(path)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
          boxSizing: "border-box",
        }}
        open
      >
        {content}
      </Drawer>
    </Box>
  );
};

export { Sidebar, DRAWER_WIDTH };
