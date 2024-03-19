import type { Metadata, Viewport } from "next"; // Import the 'Metadata' type from the "next" module.
import { Inter } from "next/font/google"; // Import the 'Inter' font from the "next/font/google" module.
import "./globals.css"; // Import global CSS styles from the "globals.css" file.
import { Providers } from "@/providers"; // Import the 'Providers' component from the "@/providers" module.
import { Analytics } from "@vercel/analytics/react"; // Import the 'Analytics' component from the "@vercel/analytics/react" module.
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";
import { metaData } from "@/metadata";

const inter = Inter({ subsets: ["latin"] }); // Initialize the 'Inter' font with the "latin" subset.
const jsonLd = metaData.jsonLd;

export const metadata: Metadata = metaData.metadata;
export const viewport: Viewport = metaData.viewport;
export const revalidate = 3600;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="twitter:card" content="/thumbnail.png" />
        <meta property="twitter:image" content="/thumbnail.png"></meta>
        <meta property="og:image" content="/thumbnail.png"></meta>
        <meta
          name="google-site-verification"
          content="YSbWeWN_f4RYnaxt__FUvujMbabAMnjmSzaJldja4Nk"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="manifest"
          href="https://www.sametcc.me/manifest.webmanifest"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Set the body class for using the 'Inter' font. */}
      <body className={inter.className}>
        {/* Wrap the main content in a 'Providers' component. */}
        <Providers>
          {/* Define the main content area. */}
          <main className="flex min-h-screen w-full flex-col items-center justify-center scroll-smooth antialiased hover:cursor-default">
            {children}
          </main>
          {/* Include analytics tracking with the 'Analytics' component. */}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
