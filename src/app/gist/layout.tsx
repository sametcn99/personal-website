import { type ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import Breadcrumb from '@/components/Breadcrumb'

// Group links by category
const sidebarCategories = {
  "API Routes": [
    { title: 'GitHub API Route', href: '/gist/github-api-route' },
    { title: 'GitHub Profile API', href: '/gist/github-profile-api' },
  ],
  "Components": [
    { title: 'Theme Switcher', href: '/gist/theme-switcher-component' },
    { title: 'Scroll To Top', href: '/gist/scroll-to-top-component' },
  ],
  "Utilities": [
    { title: 'Date Utility', href: '/gist/date-utility' },
    { title: 'Format Date Utility', href: '/gist/format-date-utility' },
    { title: 'Text Cleaner', href: '/gist/text-cleaner' },
    { title: 'Site URL Utility', href: '/gist/site-url-utility' },
    { title: 'Copy Directory Utility', href: '/gist/copy-directory-utility' },
    { title: 'Delete Folder', href: '/gist/delete-folder' },
    { title: 'Random Color Generator', href: '/gist/random-color-generator' },
    { title: 'Regex Text Utility', href: '/gist/regex-text-utility' },
    { title: 'Convert Time to Milliseconds', href: '/gist/convert-time-to-milliseconds' },
    { title: 'Markdown File Renamer', href: '/gist/markdown-file-renamer' },
    { title: 'Profile Age Calculator', href: '/gist/profile-age-calculator' },
  ],
  "GitHub": [
    { title: 'GitHub Data Store', href: '/gist/github-data-store' },
    { title: 'GitHub Repo Filter', href: '/gist/github-repo-filter' },
    { title: 'GitHub Repo Model', href: '/gist/github-repo-model' },
    { title: 'GitHub Repo Stats', href: '/gist/github-repo-stats' },
    { title: 'GitHub User Model', href: '/gist/github-user-model' },
    { title: 'Git Tag Push Utility', href: '/gist/git-tag-push-utility' },
  ],
  "Configuration": [
    { title: 'Next.js Manifest Config', href: '/gist/nextjs-manifest-config' },
    { title: 'Website Configuration', href: '/gist/website-configuration' },
    { title: 'Tailwind Page Setup', href: '/gist/tailwind-page-setup' },
    { title: 'Service Configuration Guide', href: '/gist/service-configuration-guide' },
    { title: 'Dotnet API Setup', href: '/gist/dotnet-api-setup' },
  ],
  "State Management": [
    { title: 'Redux Root Reducer Setup', href: '/gist/redux-root-reducer-setup' },
    { title: 'Dictionary Context Provider', href: '/gist/dictionary-context-provider' },
  ],
  "UI & Styling": [
    { title: 'Article Heading Styles', href: '/gist/article-heading-styles' },
  ],
  "Electron": [
    { title: 'Electron Window Manager', href: '/gist/electron-window-manager-utility' },
  ],
  "Miscellaneous": [
    { title: 'Audio Lyrics Writer', href: '/gist/audio-lyrics-writer' },
    { title: 'Auth Verifier', href: '/gist/auth-verifier' },
    { title: 'Combine Locales', href: '/gist/combine-locales' },
    { title: 'Contact Form Handler', href: '/gist/contact-form-handler' },
    { title: 'Date Range Slicer', href: '/gist/date-range-slicer' },
    { title: 'Fetch Hook', href: '/gist/fetch-hook' },
    { title: 'Hello World Translations', href: '/gist/hello-world-translations' },
    { title: 'TypeScript Glob Patterns', href: '/gist/typescript-glob-patterns' },
  ],
}

function DocHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-16 items-center px-6">
        <Link href="/gist" className="font-bold text-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
            <path d="M16 3h1a2 2 0 0 1 2 2v5c0 1.1.9 2 2 2a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1" />
          </svg>
          <span>Code Snippets</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function ThemeToggle() {
  return (
    <button 
      className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden h-5 w-5 dark:block">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block h-5 w-5 dark:hidden">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    </button>
  )
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-gray-200 bg-white pt-16 dark:border-gray-800 dark:bg-gray-950 lg:flex">
      <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-6">
        <div className="mb-4">
          <Link href="/gist" className="flex items-center gap-2 font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Overview</span>
          </Link>
        </div>
        
        {Object.entries(sidebarCategories).map(([category, links]) => (
          <div key={category} className="mb-6">
            <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">{category}</h2>
            <div className="space-y-1">
              {links.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}

function MobileNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-950 lg:hidden">
      <nav className="mx-auto flex max-w-md items-center justify-around">
        <Link href="/gist" className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs">Home</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"></path>
            <path d="M15 3v6h6"></path>
          </svg>
          <span className="text-xs">Categories</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="m21 21-5.197-5.197M15.5 10.5a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"></path>
          </svg>
          <span className="text-xs">Search</span>
        </button>
      </nav>
    </div>
  )
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <DocHeader />
      <Sidebar />
      <MobileNav />
      <main className="pb-16 pt-16 lg:pl-72">
        <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
          <Breadcrumb />
          <article className="prose prose-gray max-w-none dark:prose-invert">
            {children}
          </article>
        </div>
      </main>
    </div>
  )
}
