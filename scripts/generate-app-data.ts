import * as path from "path";
import * as fs from "fs";

interface SidebarLink {
	title: string;
	href: string;
	lastModified?: string; // Add last modified date property
}


const gistDir = path.join(__dirname, "../src/app/gist");

function generateAppData(dir: string): void {
	const items = fs.readdirSync(dir, { withFileTypes: true });

	const links: SidebarLink[] = items
		.filter((item) => item.isDirectory())
		.map((folder) => {
			const folderPath = path.join(dir, folder.name); // Get full path for statSync
			const stats = fs.statSync(folderPath); // Get file stats
			const lastModified = stats.mtime.toISOString()

			const title = folder.name
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");

			return {
				title,
				href: `/gist/${folder.name}`,
				lastModified, // Include the last modified date
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title)); // Keep sorting by title

	const sidebarData = links; // Keep as array
	
	// Create data directory if it doesn't exist
	const dataDir = path.join(__dirname, "../src/lib");
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true });
	}

	fs.writeFileSync(path.join(__dirname, "../src/lib/app-data.json"), JSON.stringify(sidebarData, null, 2));
}

generateAppData(gistDir);
