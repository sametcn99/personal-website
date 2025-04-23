import { createTheme } from '@mui/material/styles'

// Sidebar width
export const drawerWidth = 240

export const customTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#6ab7ff',
			light: '#a1d1ff',
			dark: '#4287c8',
			contrastText: '#121212',
		},
		secondary: {
			main: '#ff79b0',
			light: '#ffafd6',
			dark: '#c94f82',
			contrastText: '#121212',
		},
		background: {
			default: '#0a0a0a',
			paper: '#141414',
		},
		text: {
			primary: '#f8f8f8',
			secondary: '#a0a0a0',
			disabled: '#5a5a5a',
		},
		error: {
			main: '#ff5252',
			light: '#ff8080',
			dark: '#c50e29',
		},
		warning: {
			main: '#ffab40',
			light: '#ffd180',
			dark: '#c77c02',
		},
		info: {
			main: '#03a9f4',
			light: '#67daff',
			dark: '#007ac1',
		},
		success: {
			main: '#4caf50',
			light: '#80e27e',
			dark: '#087f23',
		},
		divider: 'rgba(255, 255, 255, 0.08)',
		action: {
			active: '#f8f8f8',
			hover: 'rgba(255, 255, 255, 0.1)',
			selected: 'rgba(255, 255, 255, 0.2)',
			disabled: 'rgba(255, 255, 255, 0.26)',
			disabledBackground: 'rgba(255, 255, 255, 0.08)',
			focus: 'rgba(255, 255, 255, 0.12)',
		},
	},
})
