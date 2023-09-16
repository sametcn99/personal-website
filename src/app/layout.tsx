// Import global styles from the "globals.css" file.
import "./styles/globals.css";

// Import necessary types from external libraries.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header/header";
// Import custom components.
import Footer from "./components/footer/footer";

// Initialize the Inter font with Latin subset.
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the page.
export const metadata: Metadata = {
  title: "sametcc.me",
  description: "Generated by create next app",
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
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "${GTM_ID}"); // GTM_ID'yi burada kullanın
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

        {/* Render the Footer component. */}
        <Footer />
      </body>
    </html>
  );
}
