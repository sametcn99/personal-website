"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ImFeelingLucky from "@/components/ImFeelingLucky";

interface FooterProps {
  allContents: ContentMetadata[];
}

export default function Footer({ allContents }: FooterProps) {
  const pathname = usePathname();

  const paths = ["/link", "/repo", "/privacy"];

  if (paths.some((path) => pathname.startsWith(path))) return null;

  return (
    <Box textAlign="center" mt={4} justifyItems="center">
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        gap={1}
        mb={1}
      >
        <Box display="flex" gap={2} mt={1} alignItems="baseline">
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Privacy Policy
            </Typography>
          </Link>
          <ImFeelingLucky contents={allContents} />
          <Link href="/rss" style={{ textDecoration: "none" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              RSS
            </Typography>
          </Link>
          <Link href="/readme" style={{ textDecoration: "none" }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              README
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
