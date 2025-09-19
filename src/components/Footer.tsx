"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box textAlign="center" mt={4} justifyItems="center">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        mb={1}
      >
        <Typography variant="body2" color="text.secondary">
          Last updated: {new Date().toLocaleDateString("tr-TR")}
        </Typography>
      </Box>
    </Box>
  );
}
