"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { useSidebarStore } from "@/lib/stores/sidebar-store"
import { useEffect } from "react"
import { SidebarHeaderComponent } from "./sidebar-header"
import { SidebarContentComponent } from "./sidebar-content"
import { SidebarFooterComponent } from "./sidebar-footer"

interface MobileSidebarProps {
  filteredCategories: Record<string, { href: string; title: string }[]>
  collapsedCategories: Record<string, boolean>
  toggleCategory: (category: string) => void
  pathname: string
  searchQuery: string
  setOpen: (open: boolean) => void
}

export function MobileSidebar({
  filteredCategories,
  collapsedCategories,
  toggleCategory,
  pathname,
  searchQuery,
  setOpen,
}: MobileSidebarProps) {
  const { isOpen, setIsOpen } = useSidebarStore()

  // Close the sidebar when navigating to a new page
  useEffect(() => {
    setIsOpen(false)
  }, [pathname, setIsOpen])

  return (
    <>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
        <MenuIcon className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[280px] p-0 sm:max-w-sm">
          <Sidebar className="h-full border-none">
            <SidebarHeaderComponent setOpen={setOpen} />
            <SidebarContent>
              <SidebarContentComponent
                filteredCategories={filteredCategories}
                collapsedCategories={collapsedCategories}
                toggleCategory={toggleCategory}
                pathname={pathname}
                searchQuery={searchQuery}
              />
            </SidebarContent>
            <SidebarFooterComponent />
          </Sidebar>
        </SheetContent>
      </Sheet>
    </>
  )
}
