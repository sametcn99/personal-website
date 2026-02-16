"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useLinks } from "@/hooks/useLinks";

/**
 * Creates a stable Umami event name for a home link label.
 */
function getHomeLinkUmamiEventName(label: string): string {
  const normalizedLabel = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `home-link-${normalizedLabel || "item"}-click`;
}

export default function LinksSection() {
  const { visibleLinks, hiddenLinks } = useLinks();
  const allLinks = [...visibleLinks, ...hiddenLinks];

  if (!allLinks.length) {
    return null;
  }
  const commonSx = {
    color: "text.secondary",
    textDecoration: "none",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "text.primary",
      textDecoration: "underline",
    },
  } as const;
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {visibleLinks.map((link) => {
          const isExternal =
            link.external || /^https?:\/\//.test(link.link.toString());
          const umamiEventName = getHomeLinkUmamiEventName(link.label);

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
                data-umami-event={umamiEventName}
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
              data-umami-event={umamiEventName}
            >
              {link.label}
            </Typography>
          );
        })}

        <Typography
          key={"all_links"}
          variant="body2"
          component={Link}
          href={"/link"}
          sx={commonSx}
          data-umami-event="home-all-links-click"
        >
          All Links
        </Typography>
      </Box>
    </Box>
  );
}
