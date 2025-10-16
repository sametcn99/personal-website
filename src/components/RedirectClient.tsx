"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function RedirectClient({ targetUrl }: { targetUrl: string }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      window.location.href = targetUrl;
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
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
    </Box>
  );
}
