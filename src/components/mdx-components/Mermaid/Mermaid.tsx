"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMermaidRendering, useMermaidUI } from "./hooks";
import { MermaidCodeView } from "./MermaidCodeView";
import { MermaidDiagram } from "./MermaidDiagram";
import { MermaidFullscreenDialog } from "./MermaidFullscreenDialog";
import { MermaidToolbar } from "./MermaidToolbar";
import type { MermaidProps } from "./types";

export function MermaidComponent({ children, id }: MermaidProps) {
  const theme = useTheme();
  const { svg, isClient } = useMermaidRendering(children, id);
  const {
    showCode,
    setShowCode,
    copied,
    downloading,
    fullscreen,
    setFullscreen,
    handleCopy,
    handleDownloadSvg,
  } = useMermaidUI(children, svg);

  return (
    <>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          borderRadius: (() => {
            const r = parseFloat(String(theme.shape.borderRadius));
            return Number.isNaN(r) ? 8 : r * 2;
          })(),
          overflow: "hidden",
          boxShadow: theme.shadows[1],
          "&:hover": { boxShadow: theme.shadows[3] },
          transition: theme.transitions.create(["box-shadow"], {
            duration: theme.transitions.duration.short,
          }),
          minHeight: "200px",
        }}
      >
        {/* Header with Toolbar */}
        <MermaidToolbar
          showCode={showCode}
          onToggleCode={() => setShowCode((s) => !s)}
          onCopy={handleCopy}
          onDownload={handleDownloadSvg}
          onFullscreen={() => setFullscreen(true)}
          copied={copied}
          downloading={downloading}
          svg={svg}
        />

        {/* Content Container */}
        <Box
          sx={{
            position: "relative",
            perspective: "1000px", // 3D flip için perspective
            minHeight: "200px",
          }}
        >
          {/* Flip Container */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              transition: theme.transitions.create(["transform"], {
                duration: theme.transitions.duration.complex,
                easing: theme.transitions.easing.easeInOut,
              }),
              transformStyle: "preserve-3d",
              transform: showCode ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Diagram Side */}
            <Box
              sx={{
                position: showCode ? "absolute" : "relative",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
                minHeight: "200px",
              }}
            >
              <MermaidDiagram svg={svg} isLoading={!isClient} />
            </Box>

            {/* Code Side */}
            <Box
              sx={{
                position: showCode ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                display: "flex",
                flexDirection: "column",
                minHeight: "200px",
              }}
            >
              <MermaidCodeView>{children}</MermaidCodeView>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Fullscreen Dialog */}
      <MermaidFullscreenDialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        svg={svg}
        downloading={downloading}
        onDownload={handleDownloadSvg}
      />
    </>
  );
}
