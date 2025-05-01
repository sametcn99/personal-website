'use client';

import { Box, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

export function PreComponent({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLPreElement>>) {
  const theme = useTheme();
  
  return (
    <Box
      component="pre"
      {...props}
      sx={{
        position: "relative",
        overflow: "auto",
        borderRadius: 2,
        bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
        color: theme.palette.mode === 'dark' ? '#e6e6e6' : '#333',
        width: "100%",
        marginY: 3,
        padding: 2,
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: alpha(theme.palette.common.black, 0.05),
        },
      }}
    >
      {children}
    </Box>
  );
}
