"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

interface MermaidProps {
    children: string;
    id?: string;
}

export function MermaidComponent({ children, id }: MermaidProps) {
    const theme = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const [svg, setSvg] = useState<string>("");

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
                    theme: theme.palette.mode === 'dark' ? 'dark' : 'default',
                    securityLevel: "loose",
                    fontFamily: "inherit",
                });

                // Generate unique ID if not provided
                const diagramId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

                // Render the diagram
                const { svg: renderedSvg } = await mermaid.render(diagramId, children.trim());
                setSvg(renderedSvg);
            } catch (error) {
                console.error("Mermaid rendering error:", error);
                setSvg(`<div style="color: ${theme.palette.error.main}; padding: 1rem; border: 1px solid ${theme.palette.error.main}; border-radius: 4px;">
          <strong>Mermaid Error:</strong><br>
          <pre style="white-space: pre-wrap; word-wrap: break-word;">${error}</pre>
        </div>`);
            }
        };

        renderMermaid();
    }, [children, id, isClient, theme]);

    if (!isClient) {
        return (
            <Box
                sx={{
                    padding: 2,
                    backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
                    borderRadius: 1,
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                }}
            >
                Loading diagram...
            </Box>
        );
    }

    return (
        <Box
            ref={ref}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '1rem 0',
                overflow: 'auto',
            }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}