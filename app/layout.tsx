import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@/lib/gtag-manager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sametcc.me",
  description: "This is my personal website. Created with Next.js.",
  keywords:
    "personal website, Next.js, web development, ui design, sametcc.me, sametcc, samet can cıncık, portfolio",
  applicationName: "sametcc.me",
  creator: "https://github.com/sametcn99",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon.png" />
      <meta property="og:image" content="/thumbnail.png" />
      <meta name="twitter:card" content="/thumbnail.png" />
      <head>
        <GoogleTagManager />
      </head>
      <body className={inter.className}>
        <Providers>
          <main className="w-full h-screen">{children}</main>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
