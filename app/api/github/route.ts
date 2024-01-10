import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Octokit } from "octokit";

// Define an asynchronous function named GET
export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const username = nextUrl.searchParams.get("username");
  const option = nextUrl.searchParams.get("option");
  const reponame = nextUrl.searchParams.get("reponame");

  const octokit = new Octokit({
    auth: process.env.GH_TOKEN, // GitHub token obtained from environment variables
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
  });

  if (username === null) {
    // Handle the case where "username" is not provided in the URL
    return NextResponse.json({
      error: "Username parameter is missing in the URL.",
    });
  }

  try {
    // Fetch rate limit status
    const rateLimitResponse = await octokit.request("GET /rate_limit");
    const rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;

    // Check if the rate limit allows making the request
    if (rateLimitRemaining === 0) {
      const resetTime = new Date(
        rateLimitResponse.data.resources.core.reset * 1000,
      );
      return NextResponse.json({
        error: "Rate limit exceeded. Please try again later.",
        resetTime: resetTime.toISOString(),
      });
    }

    let responseData;

    switch (option) {
      case "gists":
        // Fetch all gists for the specified user
        responseData = await octokit.rest.gists.listForUser({
          username,
          per_page: 100,
        });
        responseData = responseData.data;
        break;
      case "repos":
        // Fetch all repositories for the specified user
        responseData = await octokit.rest.repos.listForUser({
          username,
          per_page: 100,
        });
        responseData = responseData.data;
        break;
      case "repo":
        if (!reponame) {
          return NextResponse.json({
            error: "Reponame parameter is missing in the URL.",
          });
        }
        // Fetch all repositories for the specified user
        responseData = await octokit.rest.repos.get({
          owner: username,
          repo: reponame,
        });
        break;
      default:
        return NextResponse.json({
          error: `Invalid option "${option}".`,
        });
    }
    return NextResponse.json(responseData);
  } catch (error) {
    // Return a JSON response
    return NextResponse.json({
      error: "An error occurred while fetching data from GitHub API.",
      details: error,
    });
  }
}
