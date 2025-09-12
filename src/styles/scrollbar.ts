export const getMinimalScrollbarStyles = (isDarkTheme: boolean) => ({
  scrollbarWidth: "thin",
  scrollbarColor: `${
    isDarkTheme
      ? "rgba(255, 255, 255, 0.3) transparent"
      : "rgba(0, 0, 0, 0.2) transparent"
  }`,
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: isDarkTheme ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
    borderRadius: "3px",
    "&:hover": {
      background: isDarkTheme
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(0, 0, 0, 0.3)",
    },
  },
  "&::-webkit-scrollbar-corner": {
    background: "transparent",
  },
});
