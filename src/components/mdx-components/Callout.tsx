'use client';

import { Paper, Box, Typography, Chip, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children?: React.ReactNode;
}

export function CalloutComponent({ children, type = "info", title, ...props }: CalloutProps) {
  const theme = useTheme();
  
  const colors = {
    info: theme.palette.info.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    success: theme.palette.success.main,
  };
  
  const color = colors[type] || colors.info;
  
  return (
    <Paper
      elevation={0}
      sx={{
        my: 3,
        p: 3,
        borderRadius: 2,
        borderLeft: 4,
        borderColor: color,
        bgcolor: alpha(color, 0.08),
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
      }}
      {...props}
    >
      {title && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Chip 
            label={title} 
            size="small" 
            sx={{ 
              bgcolor: alpha(color, 0.2),
              color: theme.palette.getContrastText(alpha(color, 0.2)),
              fontWeight: 500,
              mr: 1,
            }}
          />
        </Box>
      )}
      <Typography variant="body1">{children}</Typography>
    </Paper>
  );
}
