import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
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
import Footer from "@/components/Footer";

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
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="JSON Feed"
          href="/feed.json"
        />
        <script
          defer
          src="https://umami.sametcc.me/script.js"
          data-website-id="be8d6d00-6517-4fe6-8a97-e5d0f8434685"
        ></script>
        <meta
          name="google-site-verification"
          content="YSbWeWN_f4RYnaxt__FUvujMbabAMnjmSzaJldja4Nk"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  );
}
