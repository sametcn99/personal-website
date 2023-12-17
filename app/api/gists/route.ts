import { octokit } from "@/lib/octokit";
import { NextRequest, NextResponse } from "next/server";

// Define an asynchronous function named GET
export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const username = nextUrl.searchParams.get("username");

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
        rateLimitResponse.data.resources.core.reset * 1000
      );
      return NextResponse.json({
        error: "Rate limit exceeded. Please try again later.",
        resetTime: resetTime.toISOString(),
      });
    }

    // Replace 'username' with the GitHub username whose repositories you want to fetch
    // Fetch all repositories for the specified user
    const userGists = await octokit.rest.gists.listForUser({
      username,
      per_page: 100,
    });

    // Log userRepos to the console (commented out)
    // console.log("User Repositories:", userRepos.url);

    return NextResponse.json(userGists.data);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
