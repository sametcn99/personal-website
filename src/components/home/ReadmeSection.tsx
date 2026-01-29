"use client";

import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { alpha, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function ReadmeSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mb: 6,
        p: 2,
        borderRadius: 2,
        bgcolor: alpha(theme.palette.primary.main, 0.04),
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <InfoOutlined
        fontSize="small"
        sx={{ color: theme.palette.primary.main, opacity: 0.8 }}
      />
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Check out the{" "}
        <Typography
          component={Link}
          href="/readme"
          sx={{
            color: "text.primary",
            textDecoration: "underline",
            fontWeight: 600,
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          README
        </Typography>{" "}
        to get to know me better.
      </Typography>
    </Box>
  );
}
