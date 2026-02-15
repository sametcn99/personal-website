"use client";

import Box from "@mui/material/Box";
import { ApiReferenceReact } from "@scalar/api-reference-react";

/**
 * Renders a Scalar API reference using the local OpenAPI specification file.
 */
export default function ApiReferenceDocs() {
  return (
    <Box sx={{ width: "100%" }}>
      <ApiReferenceReact
        configuration={{
          url: "/openapi.json",
          theme: "purple",
          hideDarkModeToggle: false,
          searchHotKey: "k",
        }}
      />
    </Box>
  );
}
