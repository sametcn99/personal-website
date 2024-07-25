import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const option = nextUrl.searchParams.get("option");
  const reponame = nextUrl.searchParams.get("reponame");

  const octokit = new Octokit({
    auth: process.env.GH_TOKEN, // GitHub token obtained from environment variables
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
  });
  type responseDataTypes =
    | GetResponseTypeFromEndpointMethod<typeof octokit.rest.gists.listForUser>
    | GetResponseTypeFromEndpointMethod<typeof octokit.rest.repos.listForUser>
    | GetResponseTypeFromEndpointMethod<typeof octokit.rest.repos.get>
    | GetResponseTypeFromEndpointMethod<
        typeof octokit.rest.users.getAuthenticated
      >;

  try {
    let responseData: responseDataTypes | undefined;
    switch (option) {
      case "profile":
        // Fetch all repositories for the specified user
        responseData = await octokit.rest.users.getAuthenticated();
        break;
      case "repos":
        // Fetch all repositories for the specified user
        responseData = await octokit.rest.repos.listForUser({
          username: "sametcn99",
          per_page: 100,
        });
        break;
      case "gists":
        // Fetch all gists for the specified user
        responseData = await octokit.rest.gists.listForUser({
          username: "sametcn99",
          per_page: 100,
        });
        break;
      case "repo":
        // Fetch all repositories for the specified user
        if (reponame) {
          responseData = await octokit.rest.repos.get({
            owner: "sametcn99",
            repo: reponame,
          });
        }
        break;
      default:
        return NextResponse.json({
          error: `Invalid option "${option}"`,
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
