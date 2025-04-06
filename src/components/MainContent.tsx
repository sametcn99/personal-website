'use client'

import { usePageTransition } from '@/hooks/use-page-transition'
import PageBreadcrumb from '@/components/PageBreadCrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import React, { ReactNode } from 'react'
import { MenuIcon } from 'lucide-react'

interface MainContentProps {
	isMobile: boolean
	pathname: string
	children: ReactNode
}

const MainContent: React.FC<MainContentProps> = ({
	isMobile,
	pathname,
	children,
}) => {
	const { transitionClass } = usePageTransition()

	return (
		<main className={`${transitionClass} min-w-0 flex-1`}>
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
				<article className='prose prose-invert break-words'>{children}</article>
			</div>
		</main>
	)
}

export default MainContent
