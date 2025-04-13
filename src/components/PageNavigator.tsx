'use client'

import { usePageTransition } from '@/hooks/use-page-transition'
import { Button, Typography, Box } from '@mui/material'
import React from 'react'

export function PageNavigator() {
	const { navigate, transitionClass } = usePageTransition()

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				mt: 3,
			}}
		>
			<Typography variant='h6'>Sayfalar</Typography>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 1,
				}}
			>
				<Button
					onClick={() => navigate('/blog', { direction: 'left' })}
					variant='outlined'
				>
					Blog Sayfasına Git
				</Button>
				<Button
					onClick={() => navigate('/gist', { direction: 'right' })}
					variant='outlined'
				>
					Gist Sayfasına Git
				</Button>
				<Button
					onClick={() => navigate('/cv', { direction: 'top' })}
					variant='outlined'
				>
					CV Sayfasına Git
				</Button>
			</Box>
			<Typography
				variant='body2'
				color='text.secondary'
				sx={{ mt: 1 }}
			>
				Yukarıdaki butonlarla farklı yönlerde sayfa geçiş animasyonlarını
				deneyebilirsiniz.
			</Typography>
		</Box>
	)
}
