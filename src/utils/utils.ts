import { Octokit } from 'octokit'
import fs from 'fs'
import path from 'path'

/**
 * Retrieves repository information from GitHub.
 * @param slug - The slug of the repository.
 * @returns A Promise that resolves to the repository data.
 */
export async function getRepo(slug: string) {
	const octokit = new Octokit({
		auth: process.env.GH_TOKEN,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
	})
	const data = await octokit.rest.repos.get({
		owner: 'sametcn99',
		repo: slug,
	})
	console.log(data)
	return data
}

/**
 * Retrieves the authenticated user's data from GitHub.
 * @returns {Promise<any>} The user's data.
 */
export async function getUser() {
	const octokit = new Octokit({
		auth: process.env.GH_TOKEN,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28',
		},
	})
	const data = await octokit.rest.users.getAuthenticated()
	return data
}

export function generateSidebarLinks(dir: string) {
  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  return items
    .filter(item => item.isDirectory())
    .map(folder => {
      const title = folder.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      return {
        title,
        href: `/gist/${folder.name}`
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}
