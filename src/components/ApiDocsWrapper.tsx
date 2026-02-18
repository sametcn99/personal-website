"use client";

import dynamic from "next/dynamic";

const ApiReferenceDocs = dynamic(() => import("./ApiReferenceDocs"), {
  ssr: false,
});

export default function ApiDocsWrapper() {
  return <ApiReferenceDocs />;
}
