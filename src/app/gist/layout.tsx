'use client'
import { type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
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
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	MoonIcon,
	SunIcon,
	CodeIcon,
	HomeIcon,
	SearchIcon,
	FolderIcon,
} from 'lucide-react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'

// Group links by category
const sidebarCategories = {
	'API Routes': [
		{ title: 'GitHub API Route', href: '/gist/github-api-route' },
		{ title: 'GitHub Profile API', href: '/gist/github-profile-api' },
	],
	Components: [
		{ title: 'Theme Switcher', href: '/gist/theme-switcher-component' },
		{ title: 'Scroll To Top', href: '/gist/scroll-to-top-component' },
	],
	Utilities: [
		{ title: 'Date Utility', href: '/gist/date-utility' },
		{ title: 'Format Date Utility', href: '/gist/format-date-utility' },
		{ title: 'Text Cleaner', href: '/gist/text-cleaner' },
		{ title: 'Site URL Utility', href: '/gist/site-url-utility' },
		{ title: 'Copy Directory Utility', href: '/gist/copy-directory-utility' },
		{ title: 'Delete Folder', href: '/gist/delete-folder' },
		{ title: 'Random Color Generator', href: '/gist/random-color-generator' },
		{ title: 'Regex Text Utility', href: '/gist/regex-text-utility' },
		{
			title: 'Convert Time to Milliseconds',
			href: '/gist/convert-time-to-milliseconds',
		},
		{ title: 'Markdown File Renamer', href: '/gist/markdown-file-renamer' },
		{ title: 'Profile Age Calculator', href: '/gist/profile-age-calculator' },
	],
	GitHub: [
		{ title: 'GitHub Data Store', href: '/gist/github-data-store' },
		{ title: 'GitHub Repo Filter', href: '/gist/github-repo-filter' },
		{ title: 'GitHub Repo Model', href: '/gist/github-repo-model' },
		{ title: 'GitHub Repo Stats', href: '/gist/github-repo-stats' },
		{ title: 'GitHub User Model', href: '/gist/github-user-model' },
		{ title: 'Git Tag Push Utility', href: '/gist/git-tag-push-utility' },
	],
	Configuration: [
		{ title: 'Next.js Manifest Config', href: '/gist/nextjs-manifest-config' },
		{ title: 'Website Configuration', href: '/gist/website-configuration' },
		{ title: 'Tailwind Page Setup', href: '/gist/tailwind-page-setup' },
		{
			title: 'Service Configuration Guide',
			href: '/gist/service-configuration-guide',
		},
		{ title: 'Dotnet API Setup', href: '/gist/dotnet-api-setup' },
	],
	'State Management': [
		{
			title: 'Redux Root Reducer Setup',
			href: '/gist/redux-root-reducer-setup',
		},
		{
			title: 'Dictionary Context Provider',
			href: '/gist/dictionary-context-provider',
		},
	],
	'UI & Styling': [
		{ title: 'Article Heading Styles', href: '/gist/article-heading-styles' },
	],
	Electron: [
		{
			title: 'Electron Window Manager',
			href: '/gist/electron-window-manager-utility',
		},
	],
	Miscellaneous: [
		{ title: 'Audio Lyrics Writer', href: '/gist/audio-lyrics-writer' },
		{ title: 'Auth Verifier', href: '/gist/auth-verifier' },
		{ title: 'Combine Locales', href: '/gist/combine-locales' },
		{ title: 'Contact Form Handler', href: '/gist/contact-form-handler' },
		{ title: 'Date Range Slicer', href: '/gist/date-range-slicer' },
		{ title: 'Fetch Hook', href: '/gist/fetch-hook' },
		{
			title: 'Hello World Translations',
			href: '/gist/hello-world-translations',
		},
		{
			title: 'TypeScript Glob Patterns',
			href: '/gist/typescript-glob-patterns',
		},
	],
}

function ThemeToggle() {
	return (
		<Button
			variant='ghost'
			size='icon'
			className='h-9 w-9 rounded-md'
		>
			<SunIcon className='h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
			<MoonIcon className='absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}

function PageBreadcrumb({ path }: { path: string }) {
	// Remove trailing slash and split path
	const pathSegments = path.replace(/\/$/, '').split('/').filter(Boolean)

	if (pathSegments.length === 0) return null

	return (
		<Breadcrumb className='mb-6'>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href='/'>Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />

				{pathSegments.map((segment, i) => {
					const isLast = i === pathSegments.length - 1
					const href = `/${pathSegments.slice(0, i + 1).join('/')}`

					return (
						<BreadcrumbItem key={segment}>
							{isLast ? (
								<BreadcrumbPage>{segment.replace(/-/g, ' ')}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={href}>
									{segment.replace(/-/g, ' ')}
								</BreadcrumbLink>
							)}
							{!isLast && <BreadcrumbSeparator />}
						</BreadcrumbItem>
					)
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default function GistLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname()

	return (
		<SidebarProvider defaultOpen={true}>
			<div className='flex min-h-screen w-full flex-col'>
				<div className='container mx-auto flex flex-1'>
					<aside className='fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-[220px] shrink-0 border-r md:sticky md:block lg:w-[240px]'>
						<div className='h-full overflow-hidden'>
							<Sidebar className='h-full'>
								<SidebarHeader className='px-2 py-4'>
									<div className='mb-2'>
										<Link
											href='/gist'
											className='flex items-center gap-2 text-sm font-medium'
										>
											<HomeIcon className='h-4 w-4' />
											<span>Overview</span>
										</Link>
									</div>
									<div className='relative'>
										<SearchIcon className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
										<Input
											type='search'
											placeholder='Search snippets...'
											className='bg-background w-full pl-8 text-sm'
										/>
									</div>
								</SidebarHeader>

								<SidebarContent className='px-2'>
									<ScrollArea className='h-[calc(100vh-11rem)]'>
										<div className='space-y-4'>
											{Object.entries(sidebarCategories).map(
												([category, links]) => (
													<SidebarGroup key={category}>
														<SidebarGroupLabel className='px-2'>
															{category}
														</SidebarGroupLabel>
														<SidebarSeparator className='my-2' />
														<SidebarGroupContent>
															<SidebarMenu>
																{links.map((link) => (
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
																				<span className='truncate'>
																					{link.title}
																				</span>
																			</Link>
																		</SidebarMenuButton>
																	</SidebarMenuItem>
																))}
															</SidebarMenu>
														</SidebarGroupContent>
													</SidebarGroup>
												)
											)}
										</div>
									</ScrollArea>
								</SidebarContent>

								<SidebarFooter className='border-t p-4'>
									<p className='text-muted-foreground text-xs'>
										Last updated: April 2, 2025
									</p>
								</SidebarFooter>
							</Sidebar>
						</div>
					</aside>

					<main className='min-w-0 flex-1'>
						<div className='container mx-auto max-w-4xl px-4 py-6 md:px-8'>
							<PageBreadcrumb path={pathname} />
							<article className='prose prose-invert break-words'>
								{children}
							</article>
						</div>
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}
