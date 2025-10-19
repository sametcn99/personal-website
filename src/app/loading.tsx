import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
}
