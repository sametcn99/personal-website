import React from 'react';
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
	useTheme,
	Paper,
	alpha,
} from '@mui/material';
import sidebarLinks from '@/data/sidebar-links.json';
import { drawerWidth } from '@/theme/theme';
import { usePathname } from 'next/navigation';

interface SidebarProps {
	open: boolean;
	handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, handleDrawerToggle }) => {
	const theme = useTheme();
	const pathname = usePathname();

	const drawer = (
		<Paper
			elevation={0}
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
			}}
		>
			<Box
				sx={{
					flex: 1,
					overflowY: 'auto',
					px: 1,
					'&::-webkit-scrollbar': {
						width: '6px',
					},
					'&::-webkit-scrollbar-track': {
						background: 'transparent',
					},
					'&::-webkit-scrollbar-thumb': {
						background: alpha(theme.palette.primary.main, 0.3),
						borderRadius: '3px',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						background: alpha(theme.palette.primary.main, 0.5),
					},
					scrollbarWidth: 'thin',
					scrollbarColor: `${alpha(theme.palette.primary.main, 0.3)} transparent`,
				}}
			>
				{Object.entries(sidebarLinks).map(([category, links]) => (
					<React.Fragment key={category}>
						<Typography
							variant='overline'
							sx={{
								px: 2,
								py: 1.5,
								display: 'block',
								fontSize: '0.7rem',
								letterSpacing: '0.1em',
								fontWeight: 600,
								color:
									theme.palette.mode === 'dark'
										? theme.palette.primary.light
										: theme.palette.primary.main,
							}}
						>
							{category}
						</Typography>
						<List sx={{ py: 0 }}>
							{links.map((item) => (
								<ListItem
									key={item.title}
									disablePadding
									sx={{ mb: 0.5 }}
								>
									<ListItemButton
										selected={pathname === item.href}
										sx={{
											borderRadius: '8px',
											py: 1,
											'&.Mui-selected': {
												bgcolor: alpha(theme.palette.primary.main, 0.15),
												color: theme.palette.primary.main,
												'&:hover': {
													bgcolor: alpha(theme.palette.primary.main, 0.25),
												},
											},
											'&:hover': {
												bgcolor: alpha(theme.palette.action.hover, 0.8),
											},
										}}
										href={item.href}
									>
										<ListItemText
											primary={item.title}
											primaryTypographyProps={{
												fontSize: '0.9rem',
												fontWeight: pathname === item.href ? 600 : 400,
											}}
										/>
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</React.Fragment>
				))}
			</Box>
		</Paper>
	);

	return (
		<Drawer
			variant='temporary'
			open={open}
			onClose={handleDrawerToggle}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					border: 'none',
				},
			}}
		>
			{drawer}
		</Drawer>
	);
};

export default Sidebar;
