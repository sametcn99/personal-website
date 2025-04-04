'use client'

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
	SidebarTrigger,
	SidebarSeparator,
	SidebarProvider,
} from '@/components/ui/sidebar'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from '@/components/ui/collapsible'
import {
	HomeIcon,
	SearchIcon,
	FolderIcon,
	MenuIcon,
	ChevronDownIcon,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import PageBreadcrumb from '@/components/PageBreadCrumb'
import { Analytics } from '@vercel/analytics/react'
import { Inter, Fira_Code } from 'next/font/google'
import { sidebarCategories } from '@/lib/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/utils/cn'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()
	const isMobile = useIsMobile()
	const [searchQuery, setSearchQuery] = useState('')
	const [filteredCategories, setFilteredCategories] =
		useState<typeof sidebarCategories>(sidebarCategories)
	const [open, setOpen] = useState(false)
	const [collapsedCategories, setCollapsedCategories] = useState<
		Record<string, boolean>
	>({})

	// Use effect to handle keyboard shortcut
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredCategories(sidebarCategories)
			return
		}

		const lowercaseQuery = searchQuery.toLowerCase()
		const filtered = { ...sidebarCategories }

		Object.keys(filtered).forEach((category) => {
			const key = category as keyof typeof sidebarCategories
			filtered[key] = sidebarCategories[key].filter((link) =>
				link.title.toLowerCase().includes(lowercaseQuery)
			)
		})

		// Only keep categories that have matching items
		const result = Object.fromEntries(
			Object.entries(filtered).filter(([_, links]) => links.length > 0)
		) as typeof sidebarCategories

		setFilteredCategories(result)
	}, [searchQuery])

	const toggleCategory = (category: string) => {
		setCollapsedCategories((prev) => ({
			...prev,
			[category]: !prev[category],
		}))
	}

	return (
		<html
			lang='en'
			data-theme='dark'
		>
			<head>
				<title>Samet Can Cıncık | Web Developer</title>
				<meta
					name='description'
					content='Web Developer passionate about creating compelling and user-friendly web experiences.'
				/>
				<meta
					name='keywords'
					content='web developer, frontend developer, react, next.js, typescript'
				/>
				<meta
					name='author'
					content='Samet Can Cıncık'
				/>
				<meta
					name='creator'
					content='Samet Can Cıncık'
				/>
				<meta
					name='publisher'
					content='Samet Can Cıncık'
				/>
				<meta
					name='format-detection'
					content='telephone=no'
				/>
				<meta
					name='format-detection'
					content='email=no'
				/>
				<meta
					name='format-detection'
					content='address=no'
				/>

				<meta
					property='og:title'
					content='Samet Can Cıncık | Web Developer'
				/>
				<meta
					property='og:description'
					content='Web Developer passionate about creating compelling and user-friendly web experiences.'
				/>
				<meta
					property='og:site_name'
					content='Samet Can Cıncık'
				/>
				<meta
					property='og:locale'
					content='en_US'
				/>
				<meta
					property='og:type'
					content='website'
				/>

				<meta
					name='twitter:card'
					content='summary_large_image'
				/>
				<meta
					name='twitter:title'
					content='Samet Can Cıncık | Web Developer'
				/>
				<meta
					name='twitter:description'
					content='Web Developer passionate about creating compelling and user-friendly web experiences.'
				/>
			</head>
			<body
				className={cn(
					inter.className,
					'antialiased selection:bg-slate-300 selection:text-purple-900 selection:dark:bg-slate-900 selection:dark:text-purple-500'
				)}
			>
				<SidebarProvider defaultOpen={!isMobile}>
					<div className='flex min-h-screen w-full flex-col'>
						<div className='container mx-auto flex flex-1'>
							<aside
								className={cn(
									'fixed top-16 z-30 h-[calc(100vh-4rem)] w-[220px] shrink-0 md:sticky md:block lg:w-[240px]',
									isMobile ? 'hidden' : ''
								)}
							>
								<div className='h-full overflow-hidden'>
									<Sidebar className='h-full'>
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

										<SidebarContent className='px-2'>
											<ScrollArea className='h-[calc(100vh-11rem)]'>
												<div className='space-y-4'>
													{Object.entries(filteredCategories).length > 0 ? (
														Object.entries(filteredCategories).map(
															([category, links]) => (
																<Collapsible
																	key={category}
																	defaultOpen={!collapsedCategories[category]}
																	onOpenChange={(isOpen) =>
																		toggleCategory(category)
																	}
																>
																	<SidebarGroup>
																		<CollapsibleTrigger className='w-full'>
																			<SidebarGroupLabel className='px-2 flex items-center justify-between'>
																				{category}
																				<ChevronDownIcon
																					className={cn(
																						'h-4 w-4 transition-transform',
																						collapsedCategories[category]
																							? '-rotate-90'
																							: ''
																					)}
																				/>
																			</SidebarGroupLabel>
																		</CollapsibleTrigger>
																		<SidebarSeparator className='my-2' />
																		<CollapsibleContent>
																			<SidebarGroupContent>
																				<SidebarMenu>
																					{links.map((link) => (
																						<SidebarMenuItem key={link.href}>
																							<SidebarMenuButton
																								asChild
																								data-active={
																									pathname === link.href
																								}
																							>
																								<Link
																									href={link.href}
																									className='w-full'
																								>
																									<FolderIcon className='mr-2 h-4 w-4 shrink-0' />
																									<span className='truncate'>
																										{link.title}
																									</span>
																								</Link>
																							</SidebarMenuButton>
																						</SidebarMenuItem>
																					))}
																				</SidebarMenu>
																			</SidebarGroupContent>
																		</CollapsibleContent>
																	</SidebarGroup>
																</Collapsible>
															)
														)
													) : (
														<div className='text-muted-foreground py-4 text-center'>
															No results found for &quot;{searchQuery}&quot;
														</div>
													)}
												</div>
											</ScrollArea>
										</SidebarContent>

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
									</Sidebar>
								</div>
							</aside>

							<main className='min-w-0 flex-1'>
								<div className='container mx-auto max-w-4xl px-4 py-6 md:px-8'>
									{isMobile && (
										<div className='mb-6'>
											<SidebarTrigger asChild>
												<Button
													variant='outline'
													size='icon'
												>
													<MenuIcon className='h-4 w-4' />
												</Button>
											</SidebarTrigger>
										</div>
									)}
									<PageBreadcrumb path={pathname} />
									<article className='prose prose-invert break-words'>
										{children}
									</article>
								</div>
							</main>
						</div>

						<CommandDialog
							open={open}
							onOpenChange={setOpen}
						>
							<CommandInput
								placeholder='Type to search for snippets...'
								value={searchQuery}
								onValueChange={setSearchQuery}
							/>
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								{Object.entries(filteredCategories).map(([category, links]) => (
									<CommandGroup
										key={category}
										heading={category}
									>
										{links.map((link) => (
											<CommandItem
												key={link.href}
												value={link.title}
												onSelect={() => {
													window.location.href = link.href
													setOpen(false)
												}}
											>
												<FolderIcon className='mr-2 h-4 w-4' />
												{link.title}
											</CommandItem>
										))}
									</CommandGroup>
								))}
							</CommandList>
						</CommandDialog>
					</div>
				</SidebarProvider>
				<Analytics />
				<Toaster />
			</body>
		</html>
	)
}
