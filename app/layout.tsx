import type { Metadata } from "next"; // Import the 'Metadata' type from the "next" module.

import { Inter } from "next/font/google"; // Import the 'Inter' font from the "next/font/google" module.

import "./globals.css"; // Import global CSS styles from the "globals.css" file.

import { Providers } from "@/providers"; // Import the 'Providers' component from the "@/providers" module.

import { Analytics } from "@vercel/analytics/react"; // Import the 'Analytics' component from the "@vercel/analytics/react" module.

const inter = Inter({ subsets: ["latin"] }); // Initialize the 'Inter' font with the "latin" subset.

export const metadata: Metadata = {
  title: "sametcc.me", // Define the title metadata for the page.
  description: "This is my personal website. Created with Next.js.", // Define the description metadata for the page.
  keywords:
    "personal website, Next.js, web development, ui design, sametcc.me, sametcc, samet can cıncık, portfolio", // Define keywords for the page.
  applicationName: "sametcc.me", // Define the application name metadata.
  creator: "https://github.com/sametcn99", // Define the creator's information.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2196f3" />
        {/* Define the HTML document with a language attribute set to "en". */}
        <link rel="shortcut icon" href="/favicon.png" />
        {/* Set the shortcut icon (favicon) for the page. */}
        <meta property="og:image" content="/thumbnail.png" />
        {/* Define Open Graph image property for social sharing. */}
        <meta name="twitter:card" content="/thumbnail.png" />
        {/* Define Twitter card metadata for social sharing. */}
      </head>
      <body className={inter.className}>
        {/* Set the body class for using the 'Inter' font. */}
        <Providers>
          {/* Wrap the main content in a 'Providers' component. */}
          <main className="w-full h-screen">{children}</main>
          {/* Define the main content area. */}
          <Analytics />
          {/* Include analytics tracking with the 'Analytics' component. */}
        </Providers>
      </body>
    </html>
  );
}
