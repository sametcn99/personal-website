import { useTheme as useCustomTheme } from "@/hooks/useTheme";
import { Box } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { DiagramProps } from "./types";

export function MermaidDiagram({ svg, isLoading }: DiagramProps) {
  const theme = useTheme();
  const { actualTheme } = useCustomTheme();

  if (isLoading) {
    return (
      <Box
        sx={{
          p: 2,
          backgroundColor:
            actualTheme === "dark"
              ? alpha(theme.palette.background.paper, 0.05)
              : alpha(theme.palette.grey[100], 0.8),
          border: `1px dashed ${alpha(
            theme.palette.text.primary,
            actualTheme === "dark" ? 0.3 : 0.2,
          )}`,
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
