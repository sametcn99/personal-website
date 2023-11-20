import { NextResponse } from "next/server";
import { Octokit } from "octokit";

// Define an asynchronous function named GET
export async function GET() {
  // Create a new instance of Octokit with GitHub token and API version
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN, // GitHub token obtained from environment variables
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
  });

  try {
    // Replace 'username' with the GitHub username whose repositories you want to fetch
    const username = "sametcn99";

    // Fetch all repositories for the specified user
    const userRepos = await octokit.rest.repos.listForUser({
      username,
    });

    // Log userRepos to the console (commented out)
    // console.log("User Repositories:", userRepos.url);

    // Extract specific information from each repository
    const repoDetails = userRepos.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      html_url: repo.html_url,
      home_page: repo.homepage,
      topics: repo.topics,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      license_name: repo.license?.name,
    }));

    return NextResponse.json(repoDetails);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
