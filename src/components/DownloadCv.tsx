"use client";
import DownloadIcon from "@mui/icons-material/Download";
import { alpha, IconButton, Link, Typography, useTheme } from "@mui/material";

export default function DownloadCv() {
  const theme = useTheme();

  return (
    <Link
      href="/cv/download"
      download="Samet_Can_Cincik_Ozgecmis.pdf"
      data-umami-event="cv-download-link-click"
      underline="none"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 2,
        cursor: "pointer",
        transition: theme.transitions.create(
          ["background-color", "transform", "opacity"],
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
        aria-label="Download CV"
        data-umami-event="cv-download-button-click"
        sx={{
          color: theme.palette.text.secondary,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <DownloadIcon fontSize="small" />
      </IconButton>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          letterSpacing: "0.02em",
          mr: 1,
        }}
      >
        Download CV
      </Typography>
    </Link>
  );
}
