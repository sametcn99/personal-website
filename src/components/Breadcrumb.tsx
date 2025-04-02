'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Fragment } from 'react'

export default function Breadcrumb() {
  const pathname = usePathname()
  
  // Skip rendering breadcrumbs on the main gist page
  if (pathname === '/gist') return null

  const pathSegments = pathname.split('/').filter(Boolean)
  
  return (
    <nav className="mb-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
      <ol className="flex items-center space-x-1.5">
        <li>
          <Link href="/gist" className="hover:text-gray-900 dark:hover:text-gray-100">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          
          return (
            <Fragment key={segment}>
              <li className="flex items-center">
                <span className="mx-1">/</span>
              </li>
              <li>
                {isLast ? (
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-gray-900 dark:hover:text-gray-100">
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </Link>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}