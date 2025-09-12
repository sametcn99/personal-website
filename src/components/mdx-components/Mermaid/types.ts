export interface MermaidProps {
  children: string;
  id?: string;
}

export interface ToolbarProps {
  showCode: boolean;
  onToggleCode: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onFullscreen: () => void;
  copied: boolean;
  downloading: boolean;
  svg: string;
}

export interface DiagramProps {
  svg: string;
  isLoading: boolean;
}

export interface CodeViewProps {
  children: string;
}

export interface FullscreenDialogProps {
  open: boolean;
  onClose: () => void;
  svg: string;
  downloading: boolean;
  onDownload: () => void;
}

export interface ZoomPanState {
  scale: number;
  translate: { x: number; y: number };
  isDragging: boolean;
  dragStart: { x: number; y: number };
  lastTranslate: { x: number; y: number };
}

export interface TouchState {
  lastTouchDistance: number | null;
}

export interface MermaidHooks {
  // Rendering hooks
  svg: string;
  isClient: boolean;

  // UI state hooks
  showCode: boolean;
  setShowCode: (value: boolean | ((prev: boolean) => boolean)) => void;
  copied: boolean;
  downloading: boolean;
  fullscreen: boolean;
  setFullscreen: (value: boolean) => void;

  // Zoom/Pan hooks
  scale: number;
  translate: { x: number; y: number };
  isDragging: boolean;

  // Handlers
  handleCopy: () => void;
  handleDownloadSvg: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleResetView: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleWheel: (e: React.WheelEvent) => void;
  handleDoubleClick: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}
