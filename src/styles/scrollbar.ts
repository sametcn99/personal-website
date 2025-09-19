export const getMinimalScrollbarStyles = () => ({
  scrollbarWidth: "thin",
  scrollbarColor: `${"rgba(255, 255, 255, 0.3) transparent"}`,
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.3)",
    borderRadius: "3px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.5)",
    },
  },
  "&::-webkit-scrollbar-corner": {
    background: "transparent",
  },
});
