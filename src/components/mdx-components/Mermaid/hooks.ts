import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { copyToClipboard, downloadSvg, renderMermaidDiagram } from "./utils";

/**
 * Hook for managing mermaid diagram rendering
 */
export const useMermaidRendering = (children: string, id?: string) => {
  const theme = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !children) return;

    const renderDiagram = async () => {
      const renderedSvg = await renderMermaidDiagram(children, id, theme);
      setSvg(renderedSvg);
    };

    renderDiagram();
  }, [children, id, isClient, theme]);

  return { svg, isClient };
};

/**
 * Hook for managing UI state (code view, copy, download, fullscreen)
 */
export const useMermaidUI = (children: string, svg: string) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(children);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }, [children]);

  const handleDownloadSvg = useCallback(async () => {
    if (!svg) return;

    try {
      setDownloading(true);
      await downloadSvg(svg);
      setTimeout(() => setDownloading(false), 800);
    } catch (error) {
      console.error("Error downloading SVG:", error);
      setDownloading(false);
    }
  }, [svg]);

  return {
    showCode,
    setShowCode,
    copied,
    downloading,
    fullscreen,
    setFullscreen,
    handleCopy,
    handleDownloadSvg,
  };
};

/**
 * Hook for managing zoom and pan state
 */
export const useZoomPan = () => {
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTranslate, setLastTranslate] = useState({ x: 0, y: 0 });

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

  const resetState = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setLastTranslate({ x: 0, y: 0 });
    setIsDragging(false);
    setDragStart({ x: 0, y: 0 });
  }, []);

  return {
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
  };
};

/**
 * Hook for managing mouse interactions
 */
export const useMouseInteractions = (
  isDragging: boolean,
  dragStart: { x: number; y: number },
  lastTranslate: { x: number; y: number },
  translate: { x: number; y: number },
  setIsDragging: (value: boolean) => void,
  setDragStart: (value: { x: number; y: number }) => void,
  setTranslate: (value: { x: number; y: number }) => void,
  setLastTranslate: (value: { x: number; y: number }) => void,
  setScale: (value: (prev: number) => number) => void,
  handleResetView: () => void,
) => {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 0) {
        // Left click only
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        e.preventDefault();
      }
    },
    [setIsDragging, setDragStart],
  );

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
    [isDragging, dragStart, lastTranslate, setTranslate],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setLastTranslate(translate);
    }
  }, [isDragging, translate, setIsDragging, setLastTranslate]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      setScale((prev) => Math.min(Math.max(prev * delta, 0.1), 5));
    },
    [setScale],
  );

  const handleDoubleClick = useCallback(() => {
    handleResetView();
  }, [handleResetView]);

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
  }, [isDragging, translate, setIsDragging, setLastTranslate]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    handleDoubleClick,
  };
};

/**
 * Hook for managing touch interactions
 */
export const useTouchInteractions = (
  isDragging: boolean,
  dragStart: { x: number; y: number },
  lastTranslate: { x: number; y: number },
  translate: { x: number; y: number },
  setIsDragging: (value: boolean) => void,
  setDragStart: (value: { x: number; y: number }) => void,
  setTranslate: (value: { x: number; y: number }) => void,
  setLastTranslate: (value: { x: number; y: number }) => void,
  setScale: (value: (prev: number) => number) => void,
) => {
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
    [setIsDragging, setDragStart, getTouchDistance],
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
    [
      isDragging,
      dragStart,
      lastTranslate,
      lastTouchDistance,
      getTouchDistance,
      setTranslate,
      setScale,
    ],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setLastTouchDistance(null);
    setLastTranslate(translate);
  }, [translate, setIsDragging, setLastTranslate]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

/**
 * Hook for keyboard shortcuts
 */
export const useKeyboardShortcuts = (
  fullscreen: boolean,
  setFullscreen: (value: boolean) => void,
  handleZoomIn: () => void,
  handleZoomOut: () => void,
  handleResetView: () => void,
) => {
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
  }, [fullscreen, setFullscreen, handleZoomIn, handleZoomOut, handleResetView]);
};
