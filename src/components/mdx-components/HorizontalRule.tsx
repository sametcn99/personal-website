"use client";

import { Divider, DividerProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export function HorizontalRule(props: DividerProps) {
  const theme = useTheme();

  return (
    <Divider
      sx={{
        my: 4,
        borderColor: theme.palette.divider,
        opacity: 1,
        width: "100%",
        borderWidth: 1,
        borderStyle: "solid",
      }}
      {...props}
      aria-label="Horizontal Rule"
    />
  );
}
