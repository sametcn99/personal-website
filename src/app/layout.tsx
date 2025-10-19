import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type * as React from "react";
import theme from "@/theme";
import "highlight.js/styles/github-dark.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sametcc.me"),
  title: {
    template: "%s | Samet Can Cıncık",
    default: "Samet Can Cıncık | Web Developer",
  },
  description:
    "Web Developer passionate about creating compelling and user-friendly web experiences.",
  keywords: [
    "web developer",
    "frontend developer",
    "react",
    "next.js",
    "typescript",
  ],
  authors: [{ name: "Samet Can Cıncık" }],
  creator: "Samet Can Cıncık",
  publisher: "Samet Can Cıncık",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: {
      template: "%s | Samet Can Cıncık",
      default: "Samet Can Cıncık | Web Developer",
    },
    description:
      "Web Developer passionate about creating compelling and user-friendly web experiences.",
    siteName: "Samet Can Cıncık",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samet Can Cıncık | Web Developer",
    description:
      "Web Developer passionate about creating compelling and user-friendly web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://umami.sametcc.me/script.js"
          data-website-id="be8d6d00-6517-4fe6-8a97-e5d0f8434685"
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                html: {
                  scrollbarWidth: "thin" as const,
                  scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
                },
                "*::-webkit-scrollbar": {
                  width: "8px",
                  height: "8px",
                },
                "*::-webkit-scrollbar-track": {
                  background: "transparent",
                  borderRadius: "4px",
                },
                "*::-webkit-scrollbar-thumb": {
                  background: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "4px",
                  border: "1px solid transparent",
                  backgroundClip: "content-box",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.5)",
                    backgroundClip: "content-box",
                  },
                  "&:active": {
                    background: "rgba(255, 255, 255, 0.7)",
                    backgroundClip: "content-box",
                  },
                },
                "*::-webkit-scrollbar-corner": {
                  background: "transparent",
                },
              }}
            />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  );
}
