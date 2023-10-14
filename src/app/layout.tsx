/* eslint-disable @next/next/no-sync-scripts */
// Import global styles from the "globals.css" file.
import "./styles/globals.css";

// Import necessary types from external libraries.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header/header";
import { Analytics } from "@vercel/analytics/react";
// Import custom components.

// Initialize the Inter font with Latin subset.
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the page.
export const metadata: Metadata = {
  title: "sametcc.me",
  description: "This is my personal website. Created with Next.js.",
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
      <head>
      <script
      data-project-id="JmE0mkHux7ORm1KAUKK48z6eZd6QjHjiKyJTqg6b"
      src="https://snippet.meticulous.ai/v1/meticulous.js"
      />
        {/* Load the Google Tag Manager script asynchronously */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        />

        {/* Initialize the dataLayer and configure the Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "${GTM_ID}");
            `,
          }}
        />
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
