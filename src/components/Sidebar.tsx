"use client"

import { DesktopSidebar } from "./sidebar/desktop-sidebar";
import { MobileSidebar } from "./sidebar/mobile-sidebar";


interface SidebarProps {
  isMobile: boolean
  filteredCategories: Record<string, { href: string; title: string }[]>
  collapsedCategories: Record<string, boolean>
  searchQuery: string
  pathname: string
  open: boolean
  setOpen: (open: boolean) => void
  toggleCategory: (category: string) => void
}

const SidebarComponent: React.FC<SidebarProps> = ({
  filteredCategories,
  collapsedCategories,
  searchQuery,
  pathname,
  open,
  setOpen,
  toggleCategory,
}) => {
  return (
    <>
      <MobileSidebar
        filteredCategories={filteredCategories}
        collapsedCategories={collapsedCategories}
        toggleCategory={toggleCategory}
        pathname={pathname}
        searchQuery={searchQuery}
        setOpen={setOpen}
      />
      
      <DesktopSidebar
        filteredCategories={filteredCategories}
        collapsedCategories={collapsedCategories}
        toggleCategory={toggleCategory}
        pathname={pathname}
        searchQuery={searchQuery}
        setOpen={setOpen}
      />
    </>
  )
}

export default SidebarComponent
