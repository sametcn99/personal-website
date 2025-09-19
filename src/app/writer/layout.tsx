import type { Metadata } from "next";
import { JsonLd } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "Writer - Markdown Editor",
  description:
    "Advanced markdown editor for writing, editing and previewing your documents. Features fullscreen mode, save/load functionality and professional writing experience.",
  keywords: [
    "markdown editor",
    "text editor",
    "markdown",
    "writer",
    "online editor",
    "preview",
    "fullscreen",
    "real-time preview",
    "syntax highlighting",
    "document editor",
  ],
  authors: [{ name: "Samet Can Cıncık" }],
  creator: "Samet Can Cıncık",
  publisher: "Samet Can Cıncık",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Writer - Markdown Editor | Samet Can Cıncık",
    description:
      "Advanced markdown editor for writing, editing and previewing your documents. Features fullscreen mode, save/load functionality and professional writing experience.",
    url: "https://sametcc.me/writer",
    siteName: "Samet Can Cıncık",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://sametcc.me/images/writer-og.png",
        width: 1200,
        height: 630,
        alt: "Writer - Markdown Editor Screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writer - Markdown Editor",
    description:
      "Advanced markdown editor for writing, editing and previewing your documents.",
    images: ["https://sametcc.me/images/writer-twitter.png"],
    creator: "@sametcn99",
  },
  alternates: {
    canonical: "https://sametcc.me/writer",
  },
  other: {
    "application-name": "Writer",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Writer",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export default function WriterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Writer aplikasyonu için JSON-LD structured data
  const writerAppData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Writer - Markdown Editor",
    description:
      "Advanced markdown editor for writing, editing and previewing your documents.",
    url: "https://sametcc.me/writer",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Samet Can Cıncık",
      url: "https://sametcc.me",
    },
    creator: {
      "@type": "Person",
      name: "Samet Can Cıncık",
      url: "https://sametcc.me",
    },
    featureList: [
      "Real-time markdown preview",
      "Fullscreen writing mode",
      "Save and load documents",
      "Undo/Redo functionality",
      "Keyboard shortcuts",
      "Responsive design",
      "Dark/Light theme support",
    ],
    browserRequirements: "Modern web browser with JavaScript enabled",
    screenshot: "https://sametcc.me/images/writer-screenshot.png",
    softwareVersion: "1.0",
    datePublished: "2024-01-01",
    dateModified: "2025-09-19",
  };

  return (
    <>
      <JsonLd data={writerAppData} />
      {children}
    </>
  );
}
