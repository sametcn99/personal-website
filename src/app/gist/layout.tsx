import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

const sidebarLinks = [
	{ title: 'Overview', href: '/gist' },
	{ title: 'Article Heading Styles', href: '/gist/article-heading-styles' },
	{ title: 'Audio Lyrics Writer', href: '/gist/audio-lyrics-writer' },
	{ title: 'Auth Verifier', href: '/gist/auth-verifier' },
	{ title: 'Combine Locales', href: '/gist/combine-locales' },
	{ title: 'Contact Form Handler', href: '/gist/contact-form-handler' },
	{
		title: 'Convert Time to Milliseconds',
		href: '/gist/convert-time-to-milliseconds',
	},
	{ title: 'Copy Directory Utility', href: '/gist/copy-directory-utility' },
	{ title: 'Date Range Slicer', href: '/gist/date-range-slicer' },
	{ title: 'Date Utility', href: '/gist/date-utility' },
	{ title: 'Delete Folder', href: '/gist/delete-folder' },
	{
		title: 'Dictionary Context Provider',
		href: '/gist/dictionary-context-provider',
	},
	{ title: 'Dotnet API Setup', href: '/gist/dotnet-api-setup' },
	{
		title: 'Electron Window Manager',
		href: '/gist/electron-window-manager-utility',
	},
	{ title: 'Fetch Hook', href: '/gist/fetch-hook' },
	{ title: 'Format Date Utility', href: '/gist/format-date-utility' },
	{ title: 'Git Tag Push Utility', href: '/gist/git-tag-push-utility' },
	{ title: 'GitHub API Route', href: '/gist/github-api-route' },
	{ title: 'GitHub Data Store', href: '/gist/github-data-store' },
	{ title: 'GitHub Profile API', href: '/gist/github-profile-api' },
	{ title: 'GitHub Repo Filter', href: '/gist/github-repo-filter' },
	{ title: 'GitHub Repo Model', href: '/gist/github-repo-model' },
	{ title: 'GitHub Repo Stats', href: '/gist/github-repo-stats' },
	{ title: 'GitHub User Model', href: '/gist/github-user-model' },
	{ title: 'Hello World Translations', href: '/gist/hello-world-translations' },
	{ title: 'Markdown File Renamer', href: '/gist/markdown-file-renamer' },
	{ title: 'Next.js Manifest Config', href: '/gist/nextjs-manifest-config' },
	{ title: 'Profile Age Calculator', href: '/gist/profile-age-calculator' },
	{ title: 'Random Color Generator', href: '/gist/random-color-generator' },
	{ title: 'Redux Root Reducer Setup', href: '/gist/redux-root-reducer-setup' },
	{ title: 'Regex Text Utility', href: '/gist/regex-text-utility' },
	{ title: 'Scroll To Top', href: '/gist/scroll-to-top-component' },
	{
		title: 'Service Configuration Guide',
		href: '/gist/service-configuration-guide',
	},
	{ title: 'Site URL Utility', href: '/gist/site-url-utility' },
	{ title: 'Tailwind Page Setup', href: '/gist/tailwind-page-setup' },
	{ title: 'Text Cleaner', href: '/gist/text-cleaner' },
	{ title: 'Theme Switcher', href: '/gist/theme-switcher-component' },
	{ title: 'TypeScript Glob Patterns', href: '/gist/typescript-glob-patterns' },
	{ title: 'Website Configuration', href: '/gist/website-configuration' },
]

function Sidebar() {
	return (
		<aside className='fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-gray-200 bg-white px-4 py-8 dark:border-gray-800 dark:bg-gray-900'>
			<nav className='space-y-2'>
				{sidebarLinks.map((link, i) => (
					<a
						key={i}
						href={link.href}
						className='block text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
					>
						{link.title}
					</a>
				))}
			</nav>
		</aside>
	)
}

export default function DocsLayout({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen bg-white dark:bg-gray-900'>
			<Sidebar />
			<main className='ml-64 min-h-screen px-8 py-16'>
				<div className='prose dark:prose-invert prose-h1:mb-4 prose-h2:mt-8 prose-h3:mt-6 max-w-none'>
					{children}
				</div>
			</main>
		</div>
	)
}
