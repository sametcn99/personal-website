import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { Metadata } from "next";
import BackToHome from "@/components/BackToHome";
import { CustomMDX } from "@/components/mdx";

export const metadata: Metadata = {
  title: "README",
  description: "About me - content from GitHub profile README",
};

export const dynamic = "force-dynamic";

export default async function ReadmePage() {
  const res = await fetch(
    "https://raw.githubusercontent.com/sametcn99/sametcn99/refs/heads/main/README.md",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch README");
  }

  const content = await res.text();

  return (
    <Container maxWidth="md">
      <BackToHome />
      <Box component="article" sx={{ mt: 4 }}>
        <CustomMDX source={content} />
      </Box>
    </Container>
  );
}
