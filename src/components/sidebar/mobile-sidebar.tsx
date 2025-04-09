'use client'

import { Sidebar, SidebarContent } from '@/components/ui/sidebar'
import { useSidebarStore } from '@/lib/stores/sidebar-store'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { SidebarContentComponent } from './sidebar-content'
import { SidebarHeaderComponent } from './sidebar-header'
import { SidebarFooterComponent } from './sidebar-footer'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import { useEffect } from 'react'

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
			<Button
				variant='ghost'
				size='icon'
				className='md:hidden'
				onClick={() => setIsOpen(true)}
			>
				<MenuIcon className='h-5 w-5' />
				<span className='sr-only'>Toggle Menu</span>
			</Button>

			<Sheet
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<SheetContent
					side='left'
					className='w-[280px] sm:max-w-sm'
				>
					<div className='h-full py-4'>
						<SidebarHeaderComponent setOpen={setOpen} />
						<SidebarContent className='px-2'>
							<SidebarContentComponent
								filteredCategories={filteredCategories}
								collapsedCategories={collapsedCategories}
								toggleCategory={toggleCategory}
								pathname={pathname}
								searchQuery={searchQuery}
							/>
						</SidebarContent>
						<SidebarFooterComponent />
					</div>
				</SheetContent>
			</Sheet>
		</>
	)
}
