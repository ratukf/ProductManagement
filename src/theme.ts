import { createTheme } from "@mui/material/styles";

const t = {
  primary: "#0A0A0A",
  primaryHover: "#1A1A1A",
  primarySubtle: "#F5F5F5",
  bg: "#FAFAFA",
  paper: "#FFFFFF",
  textPrimary: "#0A0A0A",
  textSecondary: "#737373",
  textMuted: "#A3A3A3",
  border: "#E5E5E5",
  borderStrong: "#D4D4D4",
  sidebar: "#FFFFFF",
};

const theme = createTheme({
  palette: {
    primary: { main: t.primary, light: "#404040", dark: "#000000" },
    secondary: { main: "#404040" },
    background: { default: t.bg, paper: t.paper },
    text: { primary: t.textPrimary, secondary: t.textSecondary },
    divider: t.border,
    error: { main: "#DC2626" },
  },

  shape: { borderRadius: 6 },

  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.03em",
      color: t.textPrimary,
      "@media (max-width: 600px)": { fontSize: "1.5rem" },
    },
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: t.textPrimary,
      "@media (max-width: 600px)": { fontSize: "1.2rem" },
    },
    h6: { fontWeight: 600, letterSpacing: "-0.01em", color: t.textPrimary },
    subtitle1: { fontWeight: 600, color: t.textPrimary },
    subtitle2: {
      fontWeight: 600,
      color: t.textSecondary,
      fontSize: "0.75rem",
      letterSpacing: "0.02em",
    },
    body1: { color: t.textPrimary, fontSize: "0.9rem" },
    body2: { color: t.textSecondary, fontSize: "0.85rem" },
    caption: { color: t.textMuted, fontSize: "0.75rem" },
    button: {
      fontWeight: 600,
      textTransform: "none" as const,
      letterSpacing: "0.01em",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: t.bg,
          scrollbarWidth: "thin",
          scrollbarColor: `${t.border} transparent`,
        },
      },
    },

    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: t.paper,
          color: t.textPrimary,
          borderBottom: `1px solid ${t.border}`,
        },
      },
    },

    MuiToolbar: { styleOverrides: { root: { minHeight: "56px !important" } } },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: t.sidebar,
          borderRight: `1px solid ${t.border}`,
          boxShadow: "none",
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: "1px 8px",
          padding: "8px 12px",
          transition: "all 0.1s ease",
          "&.Mui-selected": {
            backgroundColor: t.textPrimary,
            "&:hover": { backgroundColor: t.primaryHover },
          },
          "&:hover": { backgroundColor: t.primarySubtle },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: t.textSecondary,
          minWidth: 36,
          ".Mui-selected &": { color: "#FFFFFF" },
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "0.875rem",
          fontWeight: 500,
          color: t.textSecondary,
          ".Mui-selected &": { color: "#FFFFFF", fontWeight: 600 },
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 6, padding: "7px 16px", fontSize: "0.875rem" },
        contained: {
          backgroundColor: t.primary,
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: t.primaryHover,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          },
        },
        outlined: {
          borderColor: t.borderStrong,
          color: t.textPrimary,
          "&:hover": {
            borderColor: t.primary,
            backgroundColor: t.primarySubtle,
          },
        },
        text: {
          color: t.textSecondary,
          "&:hover": { backgroundColor: t.primarySubtle, color: t.textPrimary },
        },
        sizeSmall: { padding: "5px 12px", fontSize: "0.8rem" },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          color: t.textSecondary,
          "&:hover": { backgroundColor: t.primarySubtle, color: t.textPrimary },
          "&.MuiIconButton-colorError:hover": {
            backgroundColor: "#FEF2F2",
            color: "#DC2626",
          },
        },
      },
    },

    MuiTextField: { defaultProps: { size: "small" } },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: t.paper,
          fontSize: "0.875rem",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: t.borderStrong,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: t.primary,
            borderWidth: "1.5px",
          },
        },
        notchedOutline: { borderColor: t.border },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: "0.875rem", color: t.textSecondary },
      },
    },

    MuiSelect: { defaultProps: { size: "small" } },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: `1px solid ${t.border}`, borderRadius: 10 },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 28,
          "&:last-child": { paddingBottom: 28 },
          "@media (max-width: 600px)": { padding: "16px !important" },
        },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { backgroundImage: "none" },
        outlined: { border: `1px solid ${t.border}` },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            backgroundColor: t.bg,
            color: t.textMuted,
            fontWeight: 700,
            fontSize: "0.68rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "10px 16px",
            borderBottom: `1px solid ${t.border}`,
            "@media (max-width: 600px)": {
              padding: "8px 10px",
              fontSize: "0.62rem",
            },
          },
        },
      },
    },

    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root:hover td": { backgroundColor: "#F9F9F9" },
          "& .MuiTableRow-root:last-child td": { borderBottom: "none" },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "13px 16px",
          fontSize: "0.875rem",
          borderColor: t.border,
          color: t.textPrimary,
          "@media (max-width: 600px)": {
            padding: "10px 10px",
            fontSize: "0.78rem",
          },
        },
      },
    },

    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: `1px solid ${t.border}`,
          overflowX: "auto", // table scrolls horizontally on mobile instead of breaking layout
          WebkitOverflowScrolling: "touch",
        },
      },
    },

    MuiPagination: { defaultProps: { color: "primary", shape: "rounded" } },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "0.8rem",
          borderRadius: 6,
          "&.Mui-selected": {
            backgroundColor: t.primary,
            color: "#FFFFFF",
            "&:hover": { backgroundColor: t.primaryHover },
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: "0 32px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)",
          "@media (max-width: 600px)": {
            margin: 16,
            width: "calc(100% - 32px)",
            borderRadius: 10,
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.01em" },
      },
    },
    MuiDialogActions: {
      styleOverrides: { root: { padding: "12px 24px 20px" } },
    },

    MuiAlert: {
      styleOverrides: { root: { borderRadius: 6, fontSize: "0.875rem" } },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "0.72rem",
          borderRadius: 4,
          backgroundColor: t.primarySubtle,
          color: t.textPrimary,
          border: `1px solid ${t.border}`,
        },
      },
    },

    MuiDivider: { styleOverrides: { root: { borderColor: t.border } } },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: t.primary,
          color: "#FFFFFF",
          fontSize: "0.75rem",
          borderRadius: 4,
          fontWeight: 500,
        },
        arrow: { color: t.primary },
      },
    },
  },
});

export default theme;
