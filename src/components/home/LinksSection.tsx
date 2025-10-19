"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useLinks } from "@/hooks/useLinks";
import { useUmami } from "@/hooks/useUmami";

export default function LinksSection() {
  const { trackEvent } = useUmami();
  const { visibleLinks, hiddenLinks } = useLinks();
  const allLinks = [...visibleLinks, ...hiddenLinks];

  if (!allLinks.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Connect With Me
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "gray" }}>
        I&apos;m too lazy to bookmark things properly, so here&apos;s literally
        every platform I&apos;ve ever signed up for.
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {allLinks.map((link) => {
          const isExternal =
            link.external || /^https?:\/\//.test(link.link.toString());
          const commonSx = {
            color: "text.secondary",
            textDecoration: "none",
            transition: "color 0.2s ease",
            "&:hover": {
              color: "text.primary",
              textDecoration: "underline",
            },
          } as const;

          if (isExternal) {
            return (
              <Typography
                key={link.label}
                variant="body2"
                component="a"
                href={link.link.toString()}
                target="_blank"
                rel="noopener noreferrer"
                sx={commonSx}
                onClick={() => trackEvent("link_click", { label: link.label })}
              >
                {link.label}
              </Typography>
            );
          }

          return (
            <Typography
              key={link.label}
              variant="body2"
              component={Link}
              href={link.link.toString()}
              sx={commonSx}
              onClick={() => trackEvent("link_click", { label: link.label })}
            >
              {link.label}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
}
