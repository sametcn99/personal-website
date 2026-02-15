import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import BackToHome from "@/components/BackToHome";
import LinksList from "@/components/link/LinksList";

export const metadata: Metadata = {
  title: "Links",
  description: "All social and contact links.",
};

/**
 * Lists all configured social links on the /link page.
 */
export default function LinkPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <BackToHome />
      <Typography component="h1" variant="h3" fontWeight="bold" gutterBottom>
        All Links
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        You can open every available short link from this page.
      </Typography>
      <LinksList />
    </Container>
  );
}
