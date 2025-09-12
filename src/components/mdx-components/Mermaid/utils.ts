import type { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import mermaid from "mermaid";

/**
 * Renders a Mermaid diagram and returns the SVG string
 */
export const renderMermaidDiagram = async (
  children: string,
  id: string | undefined,
  theme: Theme,
  actualTheme: string,
): Promise<string> => {
  try {
    // Initialize mermaid with configuration
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: actualTheme === "dark" ? "dark" : "neutral",
      darkMode: actualTheme === "dark",
    });

    // Generate unique ID if not provided
    const diagramId =
      id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    // Render the diagram
    const { svg: renderedSvg } = await mermaid.render(
      diagramId,
      children.trim(),
    );
    return renderedSvg;
  } catch (error) {
    console.error("Mermaid rendering error:", error);
    return `<div style="color:${theme.palette.error.main};background:${alpha(
      theme.palette.error.main,
      actualTheme === "dark" ? 0.15 : 0.08,
    )};padding:0.75rem;border:1px solid ${alpha(
      theme.palette.error.main,
      actualTheme === "dark" ? 0.4 : 0.3,
    )};border-radius:${theme.shape.borderRadius}px;font-size:0.85rem;">
      <strong style='color:${theme.palette.error.main}'>Mermaid Error:</strong><br>
      <pre style="white-space:pre-wrap;word-wrap:break-word;margin:0;font-family:${
        theme.typography.fontFamily
      };color:${theme.palette.text.primary};">${error}</pre>
    </div>`;
  }
};

/**
 * Downloads an SVG string as a file
 */
export const downloadSvg = async (svg: string): Promise<void> => {
  if (!svg) return;

  // Parse the SVG string and extract the SVG element
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "image/svg+xml");
  const svgElement = doc.querySelector("svg");

  if (!svgElement) {
    console.error("No SVG element found");
    return;
  }

  // Clone and optimize the SVG
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

  // Ensure SVG has proper attributes
  if (!clonedSvg.getAttribute("xmlns")) {
    clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  }
  if (!clonedSvg.getAttribute("xmlns:xlink")) {
    clonedSvg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  }

  // Set a proper viewBox if it doesn't exist
  if (!clonedSvg.getAttribute("viewBox")) {
    const width = clonedSvg.getAttribute("width") || "800";
    const height = clonedSvg.getAttribute("height") || "600";
    clonedSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  // Convert to string
  const svgString = new XMLSerializer().serializeToString(clonedSvg);

  // Create blob and download
  const blob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, "-");
  const filename = `mermaid-diagram-${timestamp}.svg`;

  // Create and trigger download
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Cleanup
  URL.revokeObjectURL(url);
};

/**
 * Copies text to clipboard with fallback for older browsers
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text.trim());
    return true;
  } catch {
    // Fallback for older browsers
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text.trim();
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
};

/**
 * Calculates distance between two touch points
 */
export const getTouchDistance = (touches: React.TouchList): number | null => {
  if (touches.length < 2) return null;
  const touch1 = touches[0];
  const touch2 = touches[1];
  return Math.sqrt(
    Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2),
  );
};

/**
 * Clamps a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
