import {
	Menu as MenuIcon,
	ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material'
import { Paper, IconButton, useTheme } from '@mui/material'
import { drawerWidth } from '@/theme/theme'
import React from 'react'

interface MobileMenuToggleProps {
	open: boolean
	handleDrawerToggle: () => void
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
	open,
	handleDrawerToggle,
}) => {
	const theme = useTheme()

	return (
		<Paper
			elevation={2}
			className='sidebar-toggle'
			sx={{
				position: 'fixed',
				top: 16,
				left: open ? drawerWidth + 16 : 16,
				zIndex: 1300,
				borderRadius: '50%',
				transition: theme.transitions.create(['left'], {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.standard,
				}),
				backdropFilter: 'blur(10px)',
			}}
		>
			<IconButton
				color='primary'
				aria-label={open ? 'close drawer' : 'open drawer'}
				onClick={handleDrawerToggle}
				size='medium'
			>
				{open ? <ChevronLeftIcon /> : <MenuIcon />}
			</IconButton>
		</Paper>
	)
}

export default MobileMenuToggle
