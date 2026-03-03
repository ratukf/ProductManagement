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
  Avatar,
  useTheme,
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
  const theme = useTheme();

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  const content = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Brand header */}
      <Box sx={{ px: 2.5, py: 2.5 }}>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          Product Management Software
        </Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <List sx={{ flex: 1, pt: 1, px: 0.5 }}>
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

      {/* User info + logout */}
      <Box sx={{ p: 1.5 }}>
        {/* Avatar uses theme.palette.primary — sourced via useTheme */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 1,
            py: 1,
            mb: 0.5,
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: "0.8rem",
              fontWeight: 700,
              bgcolor: theme.palette.primary.main,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" noWrap>
              @{user?.username}
            </Typography>
          </Box>
        </Box>

        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2 }}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
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
