"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function Footer() {
  return (
    <Box textAlign="center" mt={4} justifyItems="center">
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        gap={1}
        mb={1}
      >
        <Typography variant="caption" color="text.secondary">
          Last updated:{" "}
          {new Date(process.env.NEXT_PUBLIC_BUILD_DATE!).toLocaleDateString()}
        </Typography>
        <Box display="flex" gap={2} mt={1}>
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Privacy Policy
            </Typography>
          </Link>
          <Link href="/rss" style={{ textDecoration: "none" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              RSS
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
