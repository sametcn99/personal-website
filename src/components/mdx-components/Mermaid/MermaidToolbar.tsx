import CheckIcon from "@mui/icons-material/Check";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ToolbarProps } from "./types";

export function MermaidToolbar({
  showCode,
  onToggleCode,
  onCopy,
  onDownload,
  onFullscreen,
  copied,
  downloading,
  svg,
}: ToolbarProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          fontFamily: "monospace",
          fontSize: "0.75rem",
        }}
      >
        {showCode ? "Code" : "Mermaid Diagram"}
      </Typography>

      <Stack direction="row" spacing={0.5}>
        <Tooltip title={showCode ? "Show diagram" : "Show code"} arrow>
          <IconButton
            size="small"
            onClick={onToggleCode}
            aria-label="toggle code view"
          >
            <CodeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={copied ? "Copied" : "Copy"} arrow>
          <IconButton
            size="small"
            onClick={onCopy}
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
        <Tooltip title={downloading ? "Downloading..." : "Download SVG"} arrow>
          <IconButton
            size="small"
            onClick={onDownload}
            disabled={!svg || downloading}
            aria-label="download svg"
            color={downloading ? "success" : "default"}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Fullscreen" arrow>
          <IconButton
            size="small"
            onClick={onFullscreen}
            aria-label="fullscreen"
          >
            <FullscreenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
