"use client"

import { SidebarFooter } from "@/components/ui/sidebar"

export function SidebarFooterComponent() {
  return (
    <SidebarFooter className="border-t p-4">
      <p className="text-xs text-muted-foreground">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </SidebarFooter>
  )
}
