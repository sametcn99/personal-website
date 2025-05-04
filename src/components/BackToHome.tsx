"use client";
import HomeIcon from "@mui/icons-material/Home";
import { Box, IconButton, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

export default function BackToHome() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        "@media print": {
          display: "none",
        },
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 2,
            transition: theme.transitions.create(
              ["background-color", "transform"],
              {
                duration: theme.transitions.duration.shorter,
              },
            ),
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <IconButton
            size="small"
            aria-label="Back to home page"
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <HomeIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            Back to Home
          </Typography>
        </Box>
      </Link>
    </Box>
  );
}
