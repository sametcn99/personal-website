"use client";

import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function RedirectClient({ targetUrl }: { targetUrl: string }) {
  const [countdown, setCountdown] = useState(3);
  const [showManualLink, setShowManualLink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const redirectTimer = setTimeout(() => {
      window.location.href = targetUrl;
    }, 3000);

    const manualLinkTimer = setTimeout(() => {
      setShowManualLink(true);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
      clearTimeout(manualLinkTimer);
    };
  }, [targetUrl]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        gap: 3,
        p: 2,
      }}
    >
      <Typography variant="h4" fontWeight={600}>
        Redirecting you shortly…
      </Typography>

      <Typography variant="body1" color="text.secondary">
        You’ll be automatically redirected in {countdown} second
        {countdown !== 1 ? "s" : ""}.
      </Typography>

      <CircularProgress size={32} thickness={5} />

      {showManualLink && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            If you are not redirected automatically, please click the link
            below:
          </Typography>
          <Link
            href={targetUrl}
            underline="hover"
            data-umami-event="redirect-manual-link-click"
          >
            {targetUrl}
          </Link>
        </Box>
      )}
    </Box>
  );
}
