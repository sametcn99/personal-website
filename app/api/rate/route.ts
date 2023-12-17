import { octokit } from "@/lib/octokit";
import { NextResponse } from "next/server";

// Define an asynchronous function named GET
export async function GET() {
  try {
    // Fetch rate limit status
    const rateLimitResponse = await octokit.request("GET /rate_limit");
    return NextResponse.json(rateLimitResponse);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
