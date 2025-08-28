"use client";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { alpha, Box, IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useCallback, useState } from "react";
import { MermaidComponent } from "./Mermaid";

// Helper function to extract text content from React children
const getTextFromChildren = (childrenNode: React.ReactNode): string => {
  let text = "";
  React.Children.forEach(childrenNode, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      text += child.toString();
    } else if (React.isValidElement(child)) {
      // Check if the child has its own children prop to recurse
      // and ensure it's an object with a 'children' property.
      if (
        child.props &&
        typeof child.props === "object" &&
        "children" in child.props
      ) {
        // Explicitly cast child.props.children to React.ReactNode if confident,
        // or add further checks if its type is uncertain.
        text += getTextFromChildren(child.props.children as React.ReactNode);
      }
    }
  });
  return text;
};

// Define a more specific type for the props of the <code> element
// which is the typical direct child of the <pre> component.
interface CodeElementProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode; // The actual code content
}

export function PreComponent({
  children, // This `children` is typically the <code> element
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLPreElement>>) {
  const theme = useTheme();
  const [showCopied, setShowCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    let textToCopy = "";
    // `children` of PreComponent is the <code> element.
    // The actual code string/nodes are children of this <code> element.
    if (React.isValidElement(children)) {
      const codeElement = children as React.ReactElement<CodeElementProps>;
      if (codeElement.props && codeElement.props.children) {
        textToCopy = getTextFromChildren(codeElement.props.children);
      }
    }

    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setShowCopied(true);
        setTimeout(() => {
          setShowCopied(false);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code: ", err);
        // Optionally, show an error message to the user
      }
    } else {
      console.warn("No text content found to copy for code block.");
    }
  }, [children]); // Dependencies: `children` to re-evaluate if it changes.

  // Check if this is a mermaid code block
  const isMermaidBlock =
    React.isValidElement(children) &&
    typeof children.props === "object" &&
    children.props !== null &&
    "className" in children.props &&
    typeof children.props.className === "string" &&
    children.props.className.includes("language-mermaid");

  // If it's a mermaid block, extract the code and render with MermaidComponent
  if (isMermaidBlock && React.isValidElement(children)) {
    const codeElement = children as React.ReactElement<CodeElementProps>;
    const mermaidCode = getTextFromChildren(codeElement.props.children);
    return <MermaidComponent>{mermaidCode}</MermaidComponent>;
  }

  // Check if this is a mermaid code block
  // This check must come AFTER hooks, but can use `children` directly.

  return (
    <Box
      component="pre"
      {...props}
      aria-label="code block"
      sx={{
        position: "relative",
        overflow: "auto",
        borderRadius: 2,
        bgcolor: "#1a1a1a",
        color: "#e6e6e6",
        width: "100%",
        marginY: 3,
        padding: 2, // theme.spacing(2)
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: alpha(theme.palette.common.black, 0.05),
        },
      }}
    >
      <Tooltip title={showCopied ? "Copied!" : "Copy code"} placement="left">
        <IconButton
          aria-label="copy code to clipboard"
          onClick={handleCopy}
          size="small"
          sx={{
            position: "absolute",
            top: theme.spacing(1),
            right: theme.spacing(1),
            color: theme.palette.grey[400],
            backgroundColor: alpha(theme.palette.common.black, 0.3),
            "&:hover": {
              backgroundColor: alpha(theme.palette.common.black, 0.5),
              color: theme.palette.common.white,
            },
            zIndex: 1, // Ensure button is above code content
          }}
        >
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      {children}{" "}
      {/* This renders the <code> element and its children (the code) */}
    </Box>
  );
}
