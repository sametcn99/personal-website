"use client"

import type React from "react"

import { cn } from "@/utils/cn"

interface MainContentProps {
  children: React.ReactNode
  isMobile: boolean
  pathname: string
}

const MainContent: React.FC<MainContentProps> = ({ children, pathname }) => {
  return (
    <main className="flex-1 overflow-hidden px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center md:hidden">
          {/* Mobile sidebar trigger is now inside the MobileSidebar component */}
        </div>
        <div className={cn("prose prose-slate dark:prose-invert max-w-none")}>{children}</div>
      </div>
    </main>
  )
}

export default MainContent
