"use client";
import SaveIcon from "@mui/icons-material/Save";
import { Box, IconButton, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function SaveThisPage() {
  const theme = useTheme();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box
      sx={{
        "@media print": {
          display: "none",
        },
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        onClick={handlePrint}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          borderRadius: 2,
          cursor: "pointer",
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
          aria-label="Save this page"
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <SaveIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          Save This Page
        </Typography>
      </Box>
    </Box>
  );
}
