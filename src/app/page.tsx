"use client";

import * as React from "react";
import { socialMediaLinks } from "@/lib/social";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

export default function Home() {
	const visibleLinks = socialMediaLinks.filter((link) => link.visible);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="100vh" // Ensure the box takes full viewport height
		>
			<Container maxWidth="sm">
				<List>
					{visibleLinks.map((link, index) => (
						<Fade in={true} timeout={500 + index * 150} key={link.label}>
							<ListItem disablePadding>
								<ListItemButton component="a" href={link.link.toString()} target="_blank" rel="noopener noreferrer">
									<ListItemIcon>{link.icon}</ListItemIcon>
									<ListItemText primary={link.label} />
								</ListItemButton>
							</ListItem>
						</Fade>
					))}
				</List>
			</Container>
		</Box>
	);
}
