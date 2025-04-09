"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { ChevronDownIcon, FolderIcon } from "lucide-react"
import { cn } from "@/utils/cn"
import Link from "next/link"

interface SidebarContentProps {
  filteredCategories: Record<string, { href: string; title: string }[]>
  collapsedCategories: Record<string, boolean>
  toggleCategory: (category: string) => void
  pathname: string
  searchQuery: string
}

export function SidebarContentComponent({
  filteredCategories,
  collapsedCategories,
  toggleCategory,
  pathname,
  searchQuery,
}: SidebarContentProps) {
  if (Object.entries(filteredCategories).length === 0) {
    return <div className="py-4 text-center text-muted-foreground">No results found for &quot;{searchQuery}&quot;</div>
  }

  return (
    <ScrollArea className="h-[calc(100vh-11rem)]">
      <div className="space-y-4 px-2">
        {Object.entries(filteredCategories).map(([category, links]) => (
          <Collapsible
            key={category}
            defaultOpen={!collapsedCategories[category]}
            onOpenChange={() => toggleCategory(category)}
          >
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex items-center justify-between px-2">
                  {category}
                  <ChevronDownIcon
                    className={cn("h-4 w-4 transition-transform", collapsedCategories[category] ? "-rotate-90" : "")}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <SidebarSeparator className="my-2" />
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {links.map((link: { href: string; title: string }) => (
                      <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton asChild isActive={pathname === link.href}>
                          <Link href={link.href} className="w-full">
                            <FolderIcon className="mr-2 h-4 w-4 shrink-0" />
                            <span className="truncate">{link.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </div>
    </ScrollArea>
  )
}
