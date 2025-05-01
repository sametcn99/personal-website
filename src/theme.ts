"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

const theme = createTheme({
	colorSchemes: { light: true, dark: true },
	cssVariables: {
		colorSchemeSelector: "class",
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
	components: {
		MuiAlert: {
			styleOverrides: {
				root: {
					variants: [
						{
							props: { severity: "info" },
							style: {
								backgroundColor: "#60a5fa",
							},
						},
					],
				},
			},
		},
	},
	palette: {
		primary: {
			main: "#3f51b5",
			light: "#757de8",
			dark: "#002984",
		},
		secondary: {
			main: "#f50057",
			light: "#ff4081",
			dark: "#c51162",
		},
		text: {
			primary: "#212121",
			secondary: "#757575",
		},
		divider: "#e0e0e0",
		background: {
			paper: "#ffffff",
			default: "#fafafa",
		},
		error: {
			main: "#f44336",
		},
		warning: {
			main: "#ff9800",
		},
		info: {
			main: "#2196f3",
		},
		success: {
			main: "#4caf50",
		},
	},
});

export default theme;
