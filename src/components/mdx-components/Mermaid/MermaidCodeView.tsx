import { Box, Typography } from "@mui/material";
import type { CodeViewProps } from "./types";

export function MermaidCodeView({ children }: CodeViewProps) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        overflow: "auto",
        minHeight: "200px",
      }}
    >
      <Box
        component="pre"
        sx={{
          m: 0,
          fontSize: "0.85rem",
          lineHeight: 1.5,
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <Typography
          component="code"
          sx={{
            fontFamily: "monospace",
            fontSize: "0.875em",
          }}
          aria-label="Code Block"
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
