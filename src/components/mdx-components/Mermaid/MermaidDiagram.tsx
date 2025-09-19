import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { DiagramProps } from "./types";

export function MermaidDiagram({ svg, isLoading }: DiagramProps) {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box
        sx={{
          p: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.05),
          border: `1px dashed ${alpha(theme.palette.text.primary, 0.3)}`,
          borderRadius: theme.shape.borderRadius,
          textAlign: "center",
          color: theme.palette.text.secondary,
          fontSize: "0.8rem",
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading diagram...
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        overflow: "auto",
        minHeight: "200px",
        "& svg": {
          maxWidth: "100%",
          height: "auto",
        },
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
