import * as path from 'path'
import * as fs from 'fs'

interface SidebarLink {
	title: string
	href: string
}

interface SidebarData {
	Personal: SidebarLink[]
	Gists: SidebarLink[]
}

const gistDir = path.join(__dirname, '../src/app/gist')

function generateSidebarLinks(dir: string): void {
	const items = fs.readdirSync(dir, { withFileTypes: true })

	const links: SidebarLink[] = items
		.filter((item) => item.isDirectory())
		.map((folder) => {
			const title = folder.name
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')

			return {
				title,
				href: `/gist/${folder.name}`,
			}
		})
		.sort((a, b) => a.title.localeCompare(b.title))

	const sidebarData: SidebarData = {
		Personal: [
			{ title: 'Home', href: '/' },
			{ title: ' Blog', href: '/blog' },
			{ title: 'CV', href: '/cv' },
			{ title: 'Gists', href: '/gist' },
		],
		Gists: links,
	}

	// Create data directory if it doesn't exist
	const dataDir = path.join(__dirname, '../src/data')
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir, { recursive: true })
	}

	fs.writeFileSync(
		path.join(__dirname, '../src/data/sidebar-links.json'),
		JSON.stringify(sidebarData, null, 2)
	)
}

generateSidebarLinks(gistDir)
