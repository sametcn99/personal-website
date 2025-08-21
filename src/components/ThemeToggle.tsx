"use client";

import { ThemeMode, useTheme } from "@/hooks/useTheme";
import Box from "@mui/material/Box";

export default function ThemeToggle() {
  const { themeMode, setThemeMode, mounted } = useTheme();

  // Check mounted state to prevent hydration mismatch
  if (!mounted) {
    return (
      <Box sx={{ display: "flex", gap: 0.2 }}>
        <Box
          component="span"
          sx={{
            padding: "4px 8px",
            fontWeight: 400,
            color: "text.disabled",
            fontSize: "0.75rem",
          }}
        >
          Light
        </Box>
        <Box
          component="span"
          sx={{
            padding: "4px 8px",
            fontWeight: 400,
            color: "text.disabled",
            fontSize: "0.75rem",
          }}
        >
          Dark
        </Box>
        <Box
          component="span"
          sx={{
            padding: "4px 8px",
            fontWeight: 500,
            color: "text.primary",
            fontSize: "0.75rem",
          }}
        >
          Device
        </Box>
      </Box>
    );
  }

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const themes = [
    {
      mode: "light" as ThemeMode,
      label: "Light",
    },
    {
      mode: "dark" as ThemeMode,
      label: "Dark",
    },
    {
      mode: "system" as ThemeMode,
      label: "Device",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {themes.map(({ mode, label }) => (
        <Box
          key={mode}
          component="button"
          onClick={() => handleThemeChange(mode)}
          sx={{
            background: "none",
            border: "none",
            padding: "4px 8px",
            cursor: "pointer",
            fontWeight: themeMode === mode ? 500 : 400,
            color: themeMode === mode ? "text.primary" : "text.disabled",
            fontSize: "0.75rem",
            textDecoration: "none",
            borderRadius: 0,
            opacity: themeMode === mode ? 1 : 0.7,
            transition: "opacity 0.2s ease",
            "&:hover": {
              opacity: 1,
              backgroundColor: "transparent",
            },
            "&:focus": {
              outline: "none",
            },
          }}
        >
          {label}
        </Box>
      ))}
    </Box>
  );
}
