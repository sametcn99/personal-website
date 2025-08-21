"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Last updated: {new Date().toLocaleDateString("tr-TR")}
      </Typography>
    </Box>
  );
}
