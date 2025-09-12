import Script from "next/script";
import { useId } from "react";

interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  const id = useId();
  const jsonString = JSON.stringify(data);

  return (
    <Script
      id={`json-ld-${id}`}
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {jsonString}
    </Script>
  );
}
