"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function BackToHome() {
  return (
    <Box
      sx={{
        "@media print": {
          display: "none",
        },
        width: "fit-content",
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          letterSpacing={"0.02em"}
          fontWeight={600}
          sx={{
            width: "fit-content",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Back to Home
        </Typography>
      </Link>
    </Box>
  );
}
