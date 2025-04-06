import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarSeparator,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from '@/components/ui/collapsible'
import { HomeIcon, SearchIcon, FolderIcon, ChevronDownIcon } from 'lucide-react'
import { useSidebarStore } from '@/lib/stores/sidebar-store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import Link from 'next/link'

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

interface SidebarHeaderProps {
	setOpen: (open: boolean) => void
}

const SidebarHeaderComponent: React.FC<SidebarHeaderProps> = ({ setOpen }) => {
	return (
		<SidebarHeader className='px-2 py-4'>
			<div className='mb-2'>
				<Link
					href='/'
					className='flex items-center gap-2 text-sm font-medium'
				>
					<HomeIcon className='h-4 w-4' />
					<span>Overview</span>
				</Link>
			</div>
			<div className='relative'>
				<Button
					variant='outline'
					className='text-muted-foreground relative w-full justify-start text-sm'
					onClick={() => setOpen(true)}
				>
					<SearchIcon className='mr-2 h-4 w-4' />
					Search...
					<kbd className='bg-muted pointer-events-none absolute top-1.5 right-1.5 hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex'>
						<span className='text-xs'>⌘</span>K
					</kbd>
				</Button>
			</div>
		</SidebarHeader>
	)
}

interface CategoryListProps {
	filteredCategories: Record<string, { href: string; title: string }[]>
	collapsedCategories: Record<string, boolean>
	toggleCategory: (category: string) => void
	pathname: string
	searchQuery: string
}

const CategoryList: React.FC<CategoryListProps> = ({
	filteredCategories,
	collapsedCategories,
	toggleCategory,
	pathname,
	searchQuery,
}) => {
	if (Object.entries(filteredCategories).length === 0) {
		return (
			<div className='text-muted-foreground py-4 text-center'>
				No results found for &quot;{searchQuery}&quot;
			</div>
		)
	}

	return (
		<div className='space-y-4'>
			{Object.entries(filteredCategories).map(([category, links]) => (
				<Collapsible
					key={category}
					defaultOpen={!collapsedCategories[category]}
					onOpenChange={(isOpen) => toggleCategory(category)}
				>
					<SidebarGroup>
						<CollapsibleTrigger className='w-full'>
							<SidebarGroupLabel className='px-2 flex items-center justify-between'>
								{category}
								<ChevronDownIcon
									className={cn(
										'h-4 w-4 transition-transform',
										collapsedCategories[category] ? '-rotate-90' : ''
									)}
								/>
							</SidebarGroupLabel>
						</CollapsibleTrigger>
						<SidebarSeparator className='my-2' />
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									{links.map((link: { href: string; title: string }) => (
										<SidebarMenuItem key={link.href}>
											<SidebarMenuButton
												asChild
												data-active={pathname === link.href}
											>
												<Link
													href={link.href}
													className='w-full'
												>
													<FolderIcon className='mr-2 h-4 w-4 shrink-0' />
													<span className='truncate'>{link.title}</span>
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
	)
}

const SidebarFooterComponent = () => {
	return (
		<SidebarFooter className='border-t p-4'>
			<p className='text-muted-foreground text-xs'>
				Last updated:{' '}
				{new Date().toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</p>
		</SidebarFooter>
	)
}

const SidebarComponent: React.FC<SidebarProps> = ({
	isMobile,
	filteredCategories,
	collapsedCategories,
	searchQuery,
	pathname,
	open,
	setOpen,
	toggleCategory,
}) => {
	const { isOpen } = useSidebarStore()

	return (
		<aside
			className={cn(
				'fixed top-16 z-30 h-[calc(100vh-4rem)] w-[220px] shrink-0 transition-all duration-200 ease-in-out md:sticky md:block lg:w-[240px]',
				!isOpen && 'hidden md:hidden'
			)}
		>
			<div className='h-full overflow-hidden'>
				<Sidebar className='h-full'>
					<SidebarHeaderComponent setOpen={setOpen} />
					<SidebarContent className='px-2'>
						<ScrollArea className='h-[calc(100vh-11rem)]'>
							<CategoryList
								filteredCategories={filteredCategories}
								collapsedCategories={collapsedCategories}
								toggleCategory={toggleCategory}
								pathname={pathname}
								searchQuery={searchQuery}
							/>
						</ScrollArea>
					</SidebarContent>
					<SidebarFooterComponent />
				</Sidebar>
			</div>
		</aside>
	)
}

export default SidebarComponent
