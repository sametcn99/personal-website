import theme from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/next";
import "highlight.js/styles/github-dark.css"; // Import highlight.js CSS
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type * as React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sametcc.me"), // Replace with your actual domain
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
    // Add og:image if you have one:
    // images: [
    //   {
    //     url: '/og-image.png', // Must be an absolute URL or start with /
    //     width: 1200,
    //     height: 630,
    //     alt: 'Samet Can Cıncık Website',
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samet Can Cıncık | Web Developer",
    description:
      "Web Developer passionate about creating compelling and user-friendly web experiences.",
    // Add twitter:image if you have one:
    // images: ['/twitter-image.png'], // Must be an absolute URL or start with /
    // Add twitter:creator if you have a Twitter handle:
    // creator: '@yourTwitterHandle',
  },
  // Add other metadata fields as needed
  // icons: {
  //   icon: '/favicon.ico', // Example for favicon
  //   apple: '/apple-touch-icon.png', // Example for Apple touch icon
  // },
  // verification: {
  //   google: 'your-google-site-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
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
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Global scrollbar styles */}
            <GlobalStyles
              styles={{
                html: {
                  // Firefox scrollbar styles
                  scrollbarWidth: "thin" as const,
                  scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
                },

                // Webkit scrollbar styles
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
