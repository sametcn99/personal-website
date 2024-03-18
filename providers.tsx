// app/providers.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="dark"
        themes={["dark"]}
        forcedTheme="dark"
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
