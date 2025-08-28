"use client";

import { Box, Dialog, DialogContent, Fade, IconButton, Stack, Tooltip, Typography, Chip } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import mermaid from "mermaid";
import { useCallback, useEffect, useRef, useState } from "react";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface MermaidProps {
    children: string;
    id?: string;
}

export function MermaidComponent({ children, id }: MermaidProps) {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const [svg, setSvg] = useState<string>("");
    const [showCode, setShowCode] = useState(false);
    const [copied, setCopied] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [scale, setScale] = useState(1);
    const [dialogReady, setDialogReady] = useState(false); // fullscreen içi mount kontrolü

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
                    theme: theme.palette.mode === 'dark' ? 'dark' : 'default',
                    fontFamily: theme.typography.fontFamily,
                    themeVariables: {
                        primaryColor: theme.palette.primary.main,
                        primaryTextColor: theme.palette.getContrastText(theme.palette.primary.main),
                        primaryBorderColor: theme.palette.primary.dark,
                        lineColor: theme.palette.divider,
                        textColor: theme.palette.text.primary,
                        secondaryColor: theme.palette.secondary.main,
                        tertiaryColor: theme.palette.background.paper,
                        background: theme.palette.background.paper,
                        nodeBorder: theme.palette.divider,
                        clusterBkg: theme.palette.background.default,
                        clusterBorder: theme.palette.divider,
                        titleColor: theme.palette.text.primary,
                        edgeLabelBackground: alpha(theme.palette.background.paper, 0.7)
                    }
                });

                // Generate unique ID if not provided
                const diagramId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

                // Render the diagram
                const { svg: renderedSvg } = await mermaid.render(diagramId, children.trim());
                setSvg(renderedSvg);
            } catch (error) {
                console.error("Mermaid rendering error:", error);
                setSvg(`<div style="color:${theme.palette.error.contrastText};background:${alpha(theme.palette.error.main, 0.1)};padding:0.75rem;border:1px solid ${alpha(theme.palette.error.main, 0.4)};border-radius:${theme.shape.borderRadius}px;font-size:0.85rem;">
                    <strong style='color:${theme.palette.error.main}'>Mermaid Error:</strong><br>
                    <pre style="white-space:pre-wrap;word-wrap:break-word;margin:0;font-family:${theme.typography.fontFamily};color:${theme.palette.text.primary};">${error}</pre>
                </div>`);
            }
        };

        renderMermaid();
    }, [children, id, isClient, theme]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(children.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // Fallback
            try {
                const textarea = document.createElement('textarea');
                textarea.value = children.trim();
                textarea.style.position = 'fixed';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
            } catch { }
        }
    }, [children]);

    const toolbarButtonSx = {
        bgcolor: alpha(theme.palette.background.paper, 0.9),
        backdropFilter: 'blur(8px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        borderRadius: theme.shape.borderRadius,
        width: 36,
        height: 36,
        minWidth: 36,
        color: theme.palette.text.primary,
        transition: theme.transitions.create(['background-color', 'border-color', 'transform'], {
            duration: theme.transitions.duration.short,
        }),
        '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            borderColor: alpha(theme.palette.primary.main, 0.3),
            transform: 'scale(1.05)'
        },
        '&:active': {
            transform: 'scale(0.95)'
        },
        '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.12)
        }
    } as const;

    // Keyboard shortcuts when fullscreen
    useEffect(() => {
        if (!fullscreen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setFullscreen(false);
            } else if (e.key === '+' || e.key === '=') {
                // '+' might require shift; prevent default zoom
                e.preventDefault();
                const zoomBtn = document.querySelector('[aria-label="zoom in"]') as HTMLButtonElement | null;
                zoomBtn?.click();
            } else if (e.key === '-') {
                e.preventDefault();
                const zoomBtn = document.querySelector('[aria-label="zoom out"]') as HTMLButtonElement | null;
                zoomBtn?.click();
            } else if (e.key === '0') {
                e.preventDefault();
                const resetBtn = document.querySelector('[aria-label="reset view"]') as HTMLButtonElement | null;
                resetBtn?.click();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [fullscreen]);

    if (!isClient) {
        return (
            <Box
                sx={{
                    p: 2,
                    backgroundColor: theme.palette.background.default,
                    border: `1px dashed ${alpha(theme.palette.text.primary, 0.15)}`,
                    borderRadius: theme.shape.borderRadius,
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    fontSize: '0.8rem'
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
                    position: 'relative',
                    mt: 2,
                    mb: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: (() => { const r = parseFloat(String(theme.shape.borderRadius)); return isNaN(r) ? 8 : r * 2; })(),
                    overflow: 'hidden',
                    background: theme.palette.background.paper,
                    boxShadow: theme.shadows[1],
                    '&:hover': { boxShadow: theme.shadows[3] },
                    transition: theme.transitions.create(['box-shadow'], { duration: theme.transitions.duration.short }),
                    perspective: '1000px', // 3D flip için perspective
                    minHeight: '200px' // Minimum yükseklik
                }}
            >
                {/* Flip Container */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        transition: theme.transitions.create(['transform'], {
                            duration: theme.transitions.duration.complex,
                            easing: theme.transitions.easing.easeInOut
                        }),
                        transformStyle: 'preserve-3d',
                        transform: showCode ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                >
                    {/* Diagram Side */}
                    <Box
                        ref={ref}
                        sx={{
                            position: showCode ? 'absolute' : 'relative',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 2,
                            overflow: 'auto',
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(0deg)',
                            '& svg': {
                                maxWidth: '100%',
                                height: 'auto'
                            }
                        }}
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />

                    {/* Code Side */}
                    <Box
                        sx={{
                            position: showCode ? 'relative' : 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box sx={{
                            flex: 1,
                            p: 2,
                            overflow: 'auto',
                        }}>
                            <Box component="pre" sx={{
                                m: 0,
                                fontSize: '0.85rem',
                                lineHeight: 1.5,
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}>
                                <Typography
                                    component="code"
                                    sx={{
                                        fontFamily: "monospace",
                                        fontSize: "0.875em",
                                        color: theme.palette.text.primary
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
                        position: 'absolute',
                        top: theme.spacing(1),
                        right: theme.spacing(1),
                        zIndex: 2,
                        p: theme.spacing(0.5),
                        borderRadius: typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius * 1.5 : 12,
                        background: alpha(theme.palette.background.paper, 0.95),
                        boxShadow: theme.shadows[3],
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                    }}
                >
                    <Tooltip title={showCode ? 'Show diagram' : 'Show code'} arrow>
                        <IconButton size="small" onClick={() => setShowCode(s => !s)} sx={toolbarButtonSx} aria-label="toggle code view">
                            <CodeIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={copied ? 'Copied' : 'Copy'} arrow>
                        <IconButton size="small" onClick={handleCopy} sx={toolbarButtonSx} aria-label="copy code" color={copied ? 'success' : 'default'}>
                            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Fullscreen" arrow>
                        <IconButton size="small" onClick={() => setFullscreen(true)} sx={toolbarButtonSx} aria-label="fullscreen">
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
                    onExited: () => { setDialogReady(false); setScale(1); }
                }}
                keepMounted={false}
            >
                {dialogReady && (
                    <TransformWrapper
                        minScale={0.1}
                        initialScale={1}
                        maxScale={5}
                        centerOnInit={true}
                        centerZoomedOut={true}
                        limitToBounds={false}
                        smooth={true}
                        wheel={{
                            step: 0.1,
                            smoothStep: 0.005
                        }}
                        pinch={{ step: 8 }}
                        doubleClick={{
                            disabled: false,
                            mode: "reset"
                        }}
                        panning={{
                            disabled: false,
                            velocityDisabled: false,
                            lockAxisX: false,
                            lockAxisY: false
                        }}
                        onInit={(ref) => {
                            // Force center the diagram when modal opens
                            setTimeout(() => {
                                ref.centerView(1, 200);
                            }, 100);
                        }}
                        onTransformed={(_, state) => setScale(Number(state.scale.toFixed(2)))}
                    >
                        {(utils) => (
                            <DialogContent sx={{ p: 0, background: theme.palette.background.default }}>
                                {/* Toolbar */}
                                <Box sx={{
                                    position: 'fixed',
                                    top: { xs: 4, sm: 8 },
                                    right: { xs: 4, sm: 8 },
                                    zIndex: 10,
                                    display: 'flex',
                                    gap: { xs: 0.5, sm: 1 },
                                    flexWrap: 'wrap',
                                    maxWidth: { xs: '90vw', sm: 'auto' }
                                }}>
                                    <Stack direction="row" spacing={{ xs: 0.3, sm: 0.5 }} sx={{ flexWrap: 'wrap' }}>
                                        <Tooltip title="Zoom in ( + / = )" arrow>
                                            <IconButton onClick={() => utils.zoomIn()} aria-label="zoom in" sx={toolbarButtonSx}>
                                                <ZoomInIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Zoom out ( - )" arrow>
                                            <IconButton onClick={() => utils.zoomOut()} aria-label="zoom out" sx={toolbarButtonSx}>
                                                <ZoomOutIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Reset ( 0 )" arrow>
                                            <IconButton onClick={() => {
                                                utils.resetTransform();
                                                setTimeout(() => utils.centerView(1, 200), 50);
                                                setScale(1);
                                            }} aria-label="reset view" sx={toolbarButtonSx}>
                                                <CenterFocusStrongIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Exit Fullscreen (Esc)" arrow>
                                            <IconButton onClick={() => setFullscreen(false)} aria-label="close fullscreen" sx={toolbarButtonSx}>
                                                <FullscreenExitIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Close" arrow>
                                            <IconButton onClick={() => setFullscreen(false)} aria-label="close" sx={toolbarButtonSx}>
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
                                            position: 'fixed',
                                            left: { xs: 8, sm: 12 },
                                            bottom: { xs: 8, sm: 12 },
                                            zIndex: 10,
                                            bgcolor: alpha(theme.palette.background.paper, 0.9),
                                            backdropFilter: 'blur(8px)',
                                            fontSize: { xs: '0.65rem', sm: '0.7rem' },
                                            height: { xs: 24, sm: 28 },
                                            boxShadow: theme.shadows[2],
                                            border: `1px solid ${alpha(theme.palette.divider, 0.3)}`
                                        }}
                                    />
                                </Fade>
                                {/* Diagram */}
                                <TransformComponent>
                                    <Box
                                        sx={{
                                            minHeight: '100vh',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            p: { xs: 1, sm: 2, md: 4 },
                                            '& svg': {
                                                width: '100%',
                                                height: 'auto',
                                                color: theme.palette.text.primary,
                                                maxWidth: { xs: '95vw', sm: '90vw', md: 'none' }
                                            }
                                        }}
                                        dangerouslySetInnerHTML={{ __html: svg }}
                                    />
                                </TransformComponent>
                                {!svg && (
                                    <Box sx={{ p: 4 }}>
                                        <Typography variant="body2" color="text.secondary">Loading diagram...</Typography>
                                    </Box>
                                )}
                            </DialogContent>
                        )}
                    </TransformWrapper>
                )}
            </Dialog>
        </>
    );
}