"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#3f51b5",
          light: "#757de8",
          dark: "#002984",
        },
        secondary: {
          main: "#f50057",
          light: "#ff4081",
          dark: "#c51162",
        },
        text: {
          primary: "#212121",
          secondary: "#757575",
        },
        divider: "#e0e0e0",
        background: {
          paper: "#ffffff",
          default: "#fafafa",
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
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#90caf9",
          light: "#e3f2fd",
          dark: "#42a5f5",
        },
        secondary: {
          main: "#f48fb1",
          light: "#fce4ec",
          dark: "#ad2d5f",
        },
        text: {
          primary: "#ffffff",
          secondary: "#b0b0b0",
        },
        divider: "#333333",
        background: {
          paper: "#000000",
          default: "#0a0a0aff",
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
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: "info" },
              style: {
                backgroundColor: "#60a5fa",
              },
            },
          ],
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": {
          transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        html: {
          transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        body: {
          transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
  },
});

export default theme;
