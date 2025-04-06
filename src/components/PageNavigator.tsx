'use client'

import { usePageTransition } from '@/hooks/use-page-transition'
import { Button } from '@/components/ui/button'
import React from 'react'

export function PageNavigator() {
	const { navigate, transitionClass } = usePageTransition()

	return (
		<div className='flex flex-col gap-4 mt-6'>
			<h3 className='text-xl font-semibold'>Sayfalar</h3>
			<div className='flex flex-wrap gap-3'>
				<Button
					onClick={() => navigate('/blog', { direction: 'left' })}
					variant='outline'
				>
					Blog Sayfasına Git
				</Button>
				<Button
					onClick={() => navigate('/gist', { direction: 'right' })}
					variant='outline'
				>
					Gist Sayfasına Git
				</Button>
				<Button
					onClick={() => navigate('/cv', { direction: 'top' })}
					variant='outline'
				>
					CV Sayfasına Git
				</Button>
			</div>
			<p className='text-sm text-muted-foreground mt-2'>
				Yukarıdaki butonlarla farklı yönlerde sayfa geçiş animasyonlarını
				deneyebilirsiniz.
			</p>
		</div>
	)
}
