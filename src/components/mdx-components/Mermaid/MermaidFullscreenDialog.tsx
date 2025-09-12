import { useTheme as useCustomTheme } from "@/hooks/useTheme";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  Fade,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  useKeyboardShortcuts,
  useMouseInteractions,
  useTouchInteractions,
  useZoomPan,
} from "./hooks";
import type { FullscreenDialogProps } from "./types";

export function MermaidFullscreenDialog({
  open,
  onClose,
  svg,
  downloading,
  onDownload,
}: FullscreenDialogProps) {
  const theme = useTheme();
  const { actualTheme } = useCustomTheme();
  const [dialogReady, setDialogReady] = useState(false);

  const {
    scale,
    translate,
    isDragging,
    dragStart,
    lastTranslate,
    setScale,
    setTranslate,
    setIsDragging,
    setDragStart,
    setLastTranslate,
    handleZoomIn,
    handleZoomOut,
    handleResetView,
    resetState,
  } = useZoomPan();

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleDoubleClick,
  } = useMouseInteractions(
    isDragging,
    dragStart,
    lastTranslate,
    translate,
    setIsDragging,
    setDragStart,
    setTranslate,
    setLastTranslate,
    setScale,
    handleResetView,
  );

  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useTouchInteractions(
      isDragging,
      dragStart,
      lastTranslate,
      translate,
      setIsDragging,
      setDragStart,
      setTranslate,
      setLastTranslate,
      setScale,
    );

  useKeyboardShortcuts(
    open,
    onClose,
    handleZoomIn,
    handleZoomOut,
    handleResetView,
  );

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      resetState();
      setDialogReady(false);
    }
  }, [open, resetState]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      TransitionProps={{
        onEntered: () => setDialogReady(true),
        onExited: () => setDialogReady(false),
      }}
      keepMounted={false}
    >
      {dialogReady && (
        <DialogContent
          sx={{
            p: 0,
            background:
              actualTheme === "dark"
                ? theme.palette.grey[900]
                : theme.palette.background.default,
            overflow: "hidden",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            touchAction: "none",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Toolbar */}
          <Box
            sx={{
              position: "fixed",
              top: { xs: 4, sm: 8 },
              right: { xs: 4, sm: 8 },
              zIndex: 10,
              display: "flex",
              gap: { xs: 0.5, sm: 1 },
              flexWrap: "wrap",
              maxWidth: { xs: "90vw", sm: "auto" },
            }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 0.3, sm: 0.5 }}
              sx={{ flexWrap: "wrap" }}
            >
              <Tooltip title="Zoom in ( + / = )" arrow>
                <IconButton onClick={handleZoomIn} aria-label="zoom in">
                  <ZoomInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Zoom out ( - )" arrow>
                <IconButton onClick={handleZoomOut} aria-label="zoom out">
                  <ZoomOutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset ( 0 )" arrow>
                <IconButton onClick={handleResetView} aria-label="reset view">
                  <CenterFocusStrongIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={downloading ? "Downloading..." : "Download SVG"}
                arrow
              >
                <IconButton
                  onClick={onDownload}
                  disabled={!svg || downloading}
                  aria-label="download svg"
                  color={downloading ? "success" : "default"}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Exit Fullscreen (Esc)" arrow>
                <IconButton onClick={onClose} aria-label="close fullscreen">
                  <FullscreenExitIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Close" arrow>
                <IconButton onClick={onClose} aria-label="close">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Scale Indicator */}
          <Fade in timeout={300}>
            <Chip
              size="small"
              label={`${Math.round(scale * 100)}%`}
              sx={{
                position: "fixed",
                left: { xs: 8, sm: 12 },
                bottom: { xs: 8, sm: 12 },
                zIndex: 10,
                bgcolor: alpha(
                  actualTheme === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.background.paper,
                  0.95,
                ),
                backdropFilter: "blur(8px)",
                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                height: { xs: 24, sm: 28 },
                boxShadow: theme.shadows[2],
                border: `1px solid ${alpha(
                  theme.palette.divider,
                  actualTheme === "dark" ? 0.5 : 0.3,
                )}`,
                color: theme.palette.text.primary,
              }}
            />
          </Fade>

          {/* Diagram */}
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 1, sm: 2, md: 4 },
              transform: `scale(${scale}) translate(${translate.x / scale}px, ${
                translate.y / scale
              }px)`,
              transformOrigin: "center center",
              transition: isDragging
                ? "none"
                : theme.transitions.create(["transform"], {
                    duration: theme.transitions.duration.short,
                  }),
              "& svg": {
                width: "auto",
                height: "auto",
                maxWidth: "none",
                maxHeight: "none",
                color: theme.palette.text.primary,
              },
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />

          {!svg && (
            <Box sx={{ p: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Loading diagram...
              </Typography>
            </Box>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}
