// app/providers.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { GithubProvider } from "./app/context/githubContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="dark"
        themes={["dark"]}
        forcedTheme="dark"
      >
        <GithubProvider>{children}</GithubProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
