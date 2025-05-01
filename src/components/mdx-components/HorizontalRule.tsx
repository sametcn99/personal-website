"use client";

import { Divider, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { DividerProps } from "@mui/material";

export function HorizontalRule(props: DividerProps) {
	const theme = useTheme();

	return (
		<Divider
			sx={{
				my: 4,
				borderColor: alpha(theme.palette.divider, 0.6),
				opacity: 0.6,
				width: "100%",
			}}
			{...props}
			aria-label="Horizontal Rule"
		/>
	);
}
