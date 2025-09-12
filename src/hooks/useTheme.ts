"use client";

import { useColorScheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

export function useTheme() {
  const { mode, setMode, systemMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  useEffect(() => {
    setMounted(true);
    // Read theme mode from local storage
    const savedThemeMode = localStorage.getItem(
      "theme-mode",
    ) as ThemeMode | null;
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
      if (savedThemeMode === "system") {
        setMode("system");
      } else {
        setMode(savedThemeMode);
      }
    }
  }, [setMode]);

  const changeThemeMode = (newThemeMode: ThemeMode) => {
    setThemeMode(newThemeMode);
    setMode(newThemeMode === "system" ? "system" : newThemeMode);
    localStorage.setItem("theme-mode", newThemeMode);
  };

  const cycleTheme = () => {
    let newThemeMode: ThemeMode;

    if (themeMode === "light") {
      newThemeMode = "dark";
    } else if (themeMode === "dark") {
      newThemeMode = "system";
    } else {
      newThemeMode = "light";
    }

    changeThemeMode(newThemeMode);
  };

  // Determine actual theme (only light or dark)
  const actualTheme = mounted
    ? themeMode === "system"
      ? systemMode === "dark"
        ? "dark"
        : "light"
      : themeMode
    : "light";

  // Use mounted state to prevent hydration mismatch
  return {
    mode: mounted ? mode : "light",
    themeMode: mounted ? themeMode : "system",
    actualTheme: actualTheme as "light" | "dark",
    systemMode: mounted ? systemMode : "light",
    setThemeMode: changeThemeMode,
    cycleTheme,
    mounted,
  };
}
