"use client"

import {
  Sidebar,
  SidebarContent as UISidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { SidebarFooterComponent } from "./sidebar-footer";
import { SidebarContentComponent } from "./sidebar-content";
import { SidebarHeaderComponent } from "./sidebar-header";

interface DesktopSidebarProps {
  filteredCategories: Record<string, { href: string; title: string }[]>
  collapsedCategories: Record<string, boolean>
  toggleCategory: (category: string) => void
  pathname: string
  searchQuery: string
  setOpen: (open: boolean) => void
}

export function DesktopSidebar({
  filteredCategories,
  collapsedCategories,
  toggleCategory,
  pathname,
  searchQuery,
  setOpen,
}: DesktopSidebarProps) {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[240px] shrink-0 md:block">
      <div className="h-full overflow-hidden">
        <Sidebar className="h-full border-r">
          <SidebarHeaderComponent setOpen={setOpen} />
          <UISidebarContent>
            <SidebarContentComponent
              filteredCategories={filteredCategories}
              collapsedCategories={collapsedCategories}
              toggleCategory={toggleCategory}
              pathname={pathname}
              searchQuery={searchQuery}
            />
          </UISidebarContent>
          <SidebarFooterComponent />
        </Sidebar>
      </div>
    </aside>
  )
}
