import type { Metadata, Viewport } from "next"; // Import the 'Metadata' type from the "next" module.

import { Inter } from "next/font/google"; // Import the 'Inter' font from the "next/font/google" module.

import "./globals.css"; // Import global CSS styles from the "globals.css" file.

import { Providers } from "@/providers"; // Import the 'Providers' component from the "@/providers" module.

import { Analytics } from "@vercel/analytics/react"; // Import the 'Analytics' component from the "@vercel/analytics/react" module.
import { Person, WithContext } from "schema-dts";
import ScrollToTop from "./components/scroll-to-top";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] }); // Initialize the 'Inter' font with the "latin" subset.

export const metadata: Metadata = {
  title: "Personal Website | sametcc.me",
  description:
    "I'm a Web Developer from Turkey. My passion lies in creating compelling and user-friendly web experiences in the digital realm. ",
  keywords:
    "personal website, Next.js, web development, ui design, sametcc.me, sametcc, samet can cıncık, portfolio, web developer",
  applicationName: "sametcc.me",
  creator: "https://github.com/sametcn99",
  authors: [{ name: "samet can cıncık", url: "https://www.sametcc.me/" }],
  metadataBase: new URL("https://www.sametcc.me"),
};

const jsonLd: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samet Can Cıncık",
  url: "https://www.sametcc.me/",
  sameAs: [
    "https://www.linkedin.com/in/samet-can-c%C4%B1nc%C4%B1k",
    "http://instagram.com/sametc.0",
    "https://github.com/sametcn99",
    "https://www.youtube.com/channel/UCgXu7EZ76uMqPW8i4ZCL72Q",
  ],
};

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="twitter:card" content="/thumbnail.png" />
        <meta
          name="google-site-verification"
          content="YSbWeWN_f4RYnaxt__FUvujMbabAMnjmSzaJldja4Nk"
        />
        <meta property="og:title" content="sametcc.me" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:description"
          content="This is my personal website. Created with Next.js. I'm a Web Developer from Turkey."
        />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:url" content="https://www.sametcc.me/" />
        <meta property="og:site_name" content="sametcc.me" />
        <meta property="og:locale" content="en_US" />
        <link
          rel="manifest"
          href="https://www.sametcc.me/manifest.webmanifest"
        />
      </head>
      {/* Set the body class for using the 'Inter' font. */}
      <body className={inter.className}>
        {/* Wrap the main content in a 'Providers' component. */}
        <Providers>
          {/* Define the main content area. */}
          <main className="flex flex-col items-center w-full min-h-screen scroll-smooth">
            {children}
            <script
              id="json-ld"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          </main>
          {/* Include analytics tracking with the 'Analytics' component. */}
          <Analytics />
          <SpeedInsights />
        </Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}
