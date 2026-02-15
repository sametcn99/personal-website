import Container from "@mui/material/Container";
import type { Metadata } from "next";
import ApiReferenceDocs from "@/components/ApiReferenceDocs";

export const metadata: Metadata = {
  title: "API Docs",
  description: "Scalar API reference for all public API endpoints.",
};

/**
 * Displays interactive API documentation for all `/api/*` endpoints.
 */
export default function ApiDocsPage() {
  return (
    <Container maxWidth={false} disableGutters>
      <ApiReferenceDocs />
    </Container>
  );
}
