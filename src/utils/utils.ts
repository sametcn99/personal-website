import { Octokit } from 'octokit'

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
