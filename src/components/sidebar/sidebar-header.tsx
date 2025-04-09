"use client"

import { SidebarHeader } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { HomeIcon, SearchIcon } from "lucide-react"
import Link from "next/link"

interface SidebarHeaderProps {
  setOpen: (open: boolean) => void
}

export function SidebarHeaderComponent({ setOpen }: SidebarHeaderProps) {
  return (
    <SidebarHeader className="px-2 py-4">
      <div className="mb-2">
        <Link href="/" className="flex items-center gap-2 text-sm font-medium">
          <HomeIcon className="h-4 w-4" />
          <span>Overview</span>
        </Link>
      </div>
      <div className="relative">
        <Button
          variant="outline"
          className="relative w-full justify-start text-sm text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <SearchIcon className="mr-2 h-4 w-4" />
          Search...
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
    </SidebarHeader>
  )
}
