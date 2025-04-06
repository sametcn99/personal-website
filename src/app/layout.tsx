'use client'

import { useSidebarStore } from '@/lib/stores/sidebar-store'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Analytics } from '@vercel/analytics/react'
import { Fira_Code, Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import CommandDialogComponent from '@/components/CommandDialog'
import SidebarComponent from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import { sidebarCategories } from '@/lib/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/utils/cn'
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
	const { isOpen, setIsOpen } = useSidebarStore()

	// Only close sidebar on mobile
	useEffect(() => {
		if (!isMobile) {
			setIsOpen(true)
		}
	}, [isMobile, setIsOpen])

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
				<SidebarProvider defaultOpen={true}>
					<div className='flex min-h-screen w-full flex-col'>
						<div className='container mx-auto flex flex-1'>
							<SidebarComponent
								isMobile={isMobile}
								filteredCategories={sidebarCategories}
								collapsedCategories={collapsedCategories}
								searchQuery={searchQuery}
								pathname={pathname}
								open={open}
								setOpen={setOpen}
								toggleCategory={toggleCategory}
							/>

							<MainContent
								isMobile={isMobile}
								pathname={pathname}
							>
								{children}
							</MainContent>
						</div>

						<CommandDialogComponent
							open={open}
							setOpen={setOpen}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							filteredCategories={filteredCategories}
						/>
					</div>
				</SidebarProvider>
				<Analytics />
				<Toaster />
			</body>
		</html>
	)
}
