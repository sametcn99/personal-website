"use client";
import SaveIcon from "@mui/icons-material/Save";
import {
  Alert,
  alpha,
  Box,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";

export default function SaveThisPage() {
  const theme = useTheme();
  const [isPrinting, setIsPrinting] = useState(false);
  const [showMessage, setShowMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Cleanup function for print operation
  const cleanupPrint = useCallback(() => {
    setIsPrinting(false);
    // Remove any print-specific styles we added
    const style = document.getElementById("print-styles");
    if (style) {
      document.head.removeChild(style);
    }
  }, []);

  // Handle browser print cancellation
  useEffect(() => {
    const handleBeforePrint = () => {
      // Add print-specific styles
      const style = document.createElement("style");
      style.id = "print-styles";
      style.innerHTML = `
        @media print {
          @page {
            margin: 0;
            size: A4;
          }
          body {
            margin: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          /* Hide unnecessary elements during print */
          header, footer, nav, .no-print {
            display: none !important;
          }
          /* Ensure text is readable */
          body, p, h1, h2, h3, h4, h5, h6 {
            color: black !important;
          }
          img, table {
            page-break-inside: avoid;
          }
        }
      `;
      document.head.appendChild(style);
    };

    const handleAfterPrint = () => {
      cleanupPrint();
      setShowMessage({
        type: "success",
        message: "Document prepared for saving/printing",
      });
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
      cleanupPrint();
    };
  }, [cleanupPrint]);

  const handlePrint = async () => {
    if (isPrinting) return;

    try {
      setIsPrinting(true);

      // Check browser compatibility
      if (typeof window === "undefined") {
        throw new Error("Printing is not available in this environment");
      }

      // Modern browsers check
      const isModernBrowser = "print" in window && "matchMedia" in window;
      if (!isModernBrowser) {
        throw new Error(
          "Your browser does not support modern printing features",
        );
      }

      // Small delay to ensure UI updates
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Trigger print dialog
      window.print();

      // If print dialog doesn't trigger after 100ms, reset state
      setTimeout(() => {
        if (isPrinting) {
          cleanupPrint();
          setShowMessage({
            type: "error",
            message: "Print dialog failed to open",
          });
        }
      }, 1000);
    } catch (error) {
      console.error("Failed to print:", error);
      cleanupPrint();
      setShowMessage({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to prepare document for saving",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          "@media print": {
            display: "none",
          },
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Box
          onClick={handlePrint}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 2,
            cursor: isPrinting ? "not-allowed" : "pointer",
            opacity: isPrinting ? 0.7 : 1,
            transition: theme.transitions.create(
              ["background-color", "transform", "opacity"],
              {
                duration: theme.transitions.duration.shorter,
              },
            ),
            "&:hover": {
              backgroundColor: isPrinting
                ? "transparent"
                : alpha(theme.palette.primary.main, 0.08),
            },
          }}
        >
          <IconButton
            size="small"
            aria-label="Save this page"
            disabled={isPrinting}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <SaveIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {isPrinting ? "Preparing..." : "Save This Page"}
          </Typography>
        </Box>
      </Box>{" "}
      <Snackbar
        open={!!showMessage}
        autoHideDuration={6000}
        onClose={() => setShowMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowMessage(null)}
          severity={showMessage?.type || "info"}
          sx={{ width: "100%" }}
        >
          {showMessage?.message || ""}
        </Alert>
      </Snackbar>
    </>
  );
}
