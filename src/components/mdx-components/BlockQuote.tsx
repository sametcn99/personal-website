"use client";

import { Paper, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type React from "react";

export function BlockQuote({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        my: 3,
        p: 3,
        borderRadius: 2,
        borderLeft: 4,
        borderColor: theme.palette.primary.main,
        bgcolor: alpha(theme.palette.primary.light, 0.08),
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
        position: "relative",
      }}
      {...props}
      aria-label="Block Quote"
    >
      <Typography
        component="div"
        variant="body1"
        sx={{
          fontStyle: "italic",
          pl: 3,
        }}
        aria-label="Quote Text"
      >
        {children}
      </Typography>
    </Paper>
  );
}
