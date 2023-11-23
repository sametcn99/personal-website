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
    const userGists = await octokit.request("GET /users/{username}/gists", {
      username: username,
    });

    // Log userRepos to the console (commented out)
    // console.log("User Repositories:", userRepos.url);

    return NextResponse.json(userGists.data);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
