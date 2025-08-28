"use client";

import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
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
import { useColorScheme } from "@mui/material/styles";
import mermaid from "mermaid";
import { useCallback, useEffect, useRef, useState } from "react";

interface MermaidProps {
  children: string;
  id?: string;
}

export function MermaidComponent({ children, id }: MermaidProps) {
  const theme = useTheme();
  const { mode } = useColorScheme();
  const ref = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [svg, setSvg] = useState<string>("");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dialogReady, setDialogReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTranslate, setLastTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !children) return;

    const renderMermaid = async () => {
      try {
        // Initialize mermaid with configuration
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: mode === "dark" ? "dark" : "default",
          fontFamily: theme.typography.fontFamily,
        
        });

        // Generate unique ID if not provided
        const diagramId =
          id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the diagram
        const { svg: renderedSvg } = await mermaid.render(
          diagramId,
          children.trim(),
        );
        setSvg(renderedSvg);
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        setSvg(`<div style="color:${theme.palette.error.main};background:${alpha(theme.palette.error.main, mode === 'dark' ? 0.15 : 0.1)};padding:0.75rem;border:1px solid ${alpha(theme.palette.error.main, mode === 'dark' ? 0.6 : 0.4)};border-radius:${theme.shape.borderRadius}px;font-size:0.85rem;">
                    <strong style='color:${theme.palette.error.main}'>Mermaid Error:</strong><br>
                    <pre style="white-space:pre-wrap;word-wrap:break-word;margin:0;font-family:${theme.typography.fontFamily};color:${theme.palette.text.primary};">${error}</pre>
                </div>`);
      }
    };

    renderMermaid();
  }, [children, id, isClient, theme, mode]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
      try {
        const textarea = document.createElement("textarea");
        textarea.value = children.trim();
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {}
    }
  }, [children]);

  // Custom zoom and pan handlers
  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev * 1.2, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev / 1.2, 0.1));
  }, []);

  const handleResetView = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setLastTranslate({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left click only
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setTranslate({
          x: lastTranslate.x + deltaX,
          y: lastTranslate.y + deltaY,
        });
      }
    },
    [isDragging, dragStart, lastTranslate],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setLastTranslate(translate);
    }
  }, [isDragging, translate]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale((prev) => Math.min(Math.max(prev * delta, 0.1), 5));
  }, []);

  const handleDoubleClick = useCallback(() => {
    handleResetView();
  }, [handleResetView]);

  // Touch support for mobile devices
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null,
  );

  const getTouchDistance = useCallback((touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2),
    );
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        // Single touch - start panning
        setIsDragging(true);
        setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else if (e.touches.length === 2) {
        // Pinch gesture
        const distance = getTouchDistance(e.touches);
        setLastTouchDistance(distance);
      }
      e.preventDefault();
    },
    [getTouchDistance],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        // Panning
        const deltaX = e.touches[0].clientX - dragStart.x;
        const deltaY = e.touches[0].clientY - dragStart.y;
        setTranslate({
          x: lastTranslate.x + deltaX,
          y: lastTranslate.y + deltaY,
        });
      } else if (e.touches.length === 2 && lastTouchDistance) {
        // Pinch zoom
        const distance = getTouchDistance(e.touches);
        if (distance) {
          const delta = distance / lastTouchDistance;
          setScale((prev) => Math.min(Math.max(prev * delta, 0.1), 5));
          setLastTouchDistance(distance);
        }
      }
      e.preventDefault();
    },
    [isDragging, dragStart, lastTranslate, lastTouchDistance, getTouchDistance],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setLastTouchDistance(null);
    setLastTranslate(translate);
  }, [translate]);

  const toolbarButtonSx = {
    bgcolor: alpha(mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper, 0.95),
    backdropFilter: "blur(8px)",
    border: `1px solid ${alpha(theme.palette.divider, mode === 'dark' ? 0.7 : 0.5)}`,
    borderRadius: theme.shape.borderRadius,
    width: 36,
    height: 36,
    minWidth: 36,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(
      ["background-color", "border-color", "transform"],
      {
        duration: theme.transitions.duration.short,
      },
    ),
    "&:hover": {
      bgcolor: alpha(theme.palette.primary.main, mode === 'dark' ? 0.12 : 0.08),
      borderColor: alpha(theme.palette.primary.main, mode === 'dark' ? 0.4 : 0.3),
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 2,
      bgcolor: alpha(theme.palette.primary.main, mode === 'dark' ? 0.16 : 0.12),
    },
  } as const;

  // Keyboard shortcuts when fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFullscreen(false);
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleResetView();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen, handleZoomIn, handleZoomOut, handleResetView]);

  // Global mouse up handler to ensure drag ends even if mouse leaves the dialog
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setLastTranslate(translate);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("mouseleave", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mouseleave", handleGlobalMouseUp);
    };
  }, [isDragging, translate]);

  if (!isClient) {
    return (
      <Box
        sx={{
          p: 2,
          backgroundColor: mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
          border: `1px dashed ${alpha(theme.palette.text.primary, mode === 'dark' ? 0.25 : 0.15)}`,
          borderRadius: theme.shape.borderRadius,
          textAlign: "center",
          color: theme.palette.text.secondary,
          fontSize: "0.8rem",
        }}
      >
        Loading diagram...
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",
          mt: 2,
          mb: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: (() => {
            const r = parseFloat(String(theme.shape.borderRadius));
            return isNaN(r) ? 8 : r * 2;
          })(),
          overflow: "hidden",
          background: mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          "&:hover": { boxShadow: theme.shadows[3] },
          transition: theme.transitions.create(["box-shadow"], {
            duration: theme.transitions.duration.short,
          }),
          perspective: "1000px", // 3D flip için perspective
          minHeight: "200px", // Minimum yükseklik
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
            ref={ref}
            sx={{
              position: showCode ? "absolute" : "relative",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              overflow: "auto",
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
              "& svg": {
                maxWidth: "100%",
                height: "auto",
              },
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
          />

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
            }}
          >
            <Box
              sx={{
                flex: 1,
                p: 2,
                overflow: "auto",
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
                    color: theme.palette.text.primary,
                  }}
                  aria-label="Code Block"
                >
                  {children}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Toolbar */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: "absolute",
            top: theme.spacing(1),
            right: theme.spacing(1),
            zIndex: 2,
            p: theme.spacing(0.5),
            borderRadius:
              typeof theme.shape.borderRadius === "number"
                ? theme.shape.borderRadius * 1.5
                : 12,
            background: alpha(mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper, 0.95),
            boxShadow: theme.shadows[3],
            backdropFilter: "blur(12px)",
            border: `1px solid ${alpha(theme.palette.divider, mode === 'dark' ? 0.4 : 0.3)}`,
          }}
        >
          <Tooltip title={showCode ? "Show diagram" : "Show code"} arrow>
            <IconButton
              size="small"
              onClick={() => setShowCode((s) => !s)}
              sx={toolbarButtonSx}
              aria-label="toggle code view"
            >
              <CodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={copied ? "Copied" : "Copy"} arrow>
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={toolbarButtonSx}
              aria-label="copy code"
              color={copied ? "success" : "default"}
            >
              {copied ? (
                <CheckIcon fontSize="small" />
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Fullscreen" arrow>
            <IconButton
              size="small"
              onClick={() => setFullscreen(true)}
              sx={toolbarButtonSx}
              aria-label="fullscreen"
            >
              <FullscreenIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <Dialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        fullScreen
        TransitionProps={{
          onEntered: () => setDialogReady(true),
          onExited: () => {
            setDialogReady(false);
            setScale(1);
            setTranslate({ x: 0, y: 0 });
            setLastTranslate({ x: 0, y: 0 });
          },
        }}
        keepMounted={false}
      >
        {dialogReady && (
          <DialogContent
            sx={{
              p: 0,
              background: mode === 'dark' ? theme.palette.grey[900] : theme.palette.background.default,
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
                  <IconButton
                    onClick={handleZoomIn}
                    aria-label="zoom in"
                    sx={toolbarButtonSx}
                  >
                    <ZoomInIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom out ( - )" arrow>
                  <IconButton
                    onClick={handleZoomOut}
                    aria-label="zoom out"
                    sx={toolbarButtonSx}
                  >
                    <ZoomOutIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reset ( 0 )" arrow>
                  <IconButton
                    onClick={handleResetView}
                    aria-label="reset view"
                    sx={toolbarButtonSx}
                  >
                    <CenterFocusStrongIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Exit Fullscreen (Esc)" arrow>
                  <IconButton
                    onClick={() => setFullscreen(false)}
                    aria-label="close fullscreen"
                    sx={toolbarButtonSx}
                  >
                    <FullscreenExitIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Close" arrow>
                  <IconButton
                    onClick={() => setFullscreen(false)}
                    aria-label="close"
                    sx={toolbarButtonSx}
                  >
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
                  bgcolor: alpha(mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper, 0.95),
                  backdropFilter: "blur(8px)",
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  height: { xs: 24, sm: 28 },
                  boxShadow: theme.shadows[2],
                  border: `1px solid ${alpha(theme.palette.divider, mode === 'dark' ? 0.4 : 0.3)}`,
                  color: theme.palette.text.primary,
                }}
              />
            </Fade>

            {/* Diagram */}
            <Box
              ref={diagramRef}
              sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 1, sm: 2, md: 4 },
                transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
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
    </>
  );
}
