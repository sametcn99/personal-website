"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ad2d5f",
    },
    text: {
      primary: "#dbdbdbff",
      secondary: "#b0b0b0",
    },
    divider: "#5f5f5fff",
    background: {
      paper: "#0c0c0cff",
      default: "#0e0e0eff",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    // Add action colors for better icon visibility
    action: {
      active: "#90caf9",
      hover: "rgba(144, 202, 249, 0.04)",
      selected: "rgba(144, 202, 249, 0.12)",
      disabled: "rgba(144, 202, 249, 0.26)",
      disabledBackground: "rgba(144, 202, 249, 0.12)",
    },
  },
  components: {
    // Set default colors for MUI components
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          // Default icon color when no color prop is specified
          color: "#90caf9", // Use primary color as default
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#90caf9", // Default IconButton color
        },
      },
    },
  },
});

export default theme;
