"use client";

import { Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
	className?: string;
}

export function CodeComponent({ children, className, ...props }: React.PropsWithChildren<CodeProps>) {
	const theme = useTheme();
	const isInlineCode = !className;

	if (isInlineCode) {
		return (
			<Typography
				component="code"
				sx={{
					backgroundColor: alpha(theme.palette.primary.dark, 0.5),
					color: theme.palette.primary.main,
					padding: "0.2em 0.4em",
					borderRadius: 1,
					fontFamily: "monospace",
					fontSize: "0.875em",
				}}
				{...props}
				aria-label="Inline Code"
			>
				{children}
			</Typography>
		);
	}

	return (
		<Typography
			component="code"
			sx={{
				fontFamily: "monospace",
				fontSize: "0.875em",
			}}
			{...props}
			aria-label="Code Block"
		>
			{children}
		</Typography>
	);
}
