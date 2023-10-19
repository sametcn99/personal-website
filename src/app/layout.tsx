/* eslint-disable @next/next/no-sync-scripts */
// Import global styles from the "globals.css" file.
import "./styles/globals.css";

// Import necessary types from external libraries.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header/header";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "./lib/gtag-manager";
// Import custom components.

// Initialize the Inter font with Latin subset.
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the page.
export const metadata: Metadata = {
  title: "sametcc.me",
  description: "This is my personal website. Created with Next.js.",
  keywords:
    "personal website, Next.js, web development, ui design, sametcc.me, sametcc, samet can cıncık, sametc0",
  applicationName: "sametcc.me",
  creator: "Samet Can Cıncık",
};

// Define the root layout component.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    // Define the HTML structure of the page with the language set to English.
    <html lang="en">
      {/* Set the shortcut icon for the page. */}
      <link rel="shortcut icon" href="/favicon.png" />
      <meta property="og:image" content="/thumbnail.png" />
      <meta name="twitter:card" content="/thumbnail.png"></meta>
      <head>
        <GoogleTagManager GTM_ID={GTM_ID} />
      </head>
      {/* Start the page body with the Inter font applied. */}
      <body className={inter.className}>
        {/* Render the Header component. */}
        <Header />

        {/* Render the children components, which will be the page content. */}
        {children}
        <Analytics />
        {/* Render the Footer component. */}
      </body>
    </html>
  );
}
