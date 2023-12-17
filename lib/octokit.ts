import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: process.env.GH_TOKEN, // GitHub token obtained from environment variables
  headers: {
    "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
  },
});
