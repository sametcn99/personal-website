import { Octokit } from "octokit";

/**
 * Returns a configured Octokit instance.
 */
function createOctokit(authToken?: string) {
  return new Octokit({
    ...(authToken ? { auth: authToken } : {}),
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

/**
 * Checks whether a failed GitHub request should be retried without auth.
 */
function shouldRetryWithoutAuth(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const status = "status" in error ? error.status : undefined;
  return status === 401 || status === 403;
}

/**
 * Retrieves repository information from GitHub.
 * @param slug - The slug of the repository.
 * @returns A Promise that resolves to the repository data.
 */
export async function getRepo(slug: string) {
  const token = process.env.GH_TOKEN?.trim();
  const requestRepo = async (octokit: Octokit) =>
    octokit.rest.repos.get({
      owner: "sametcn99",
      repo: slug,
    });

  if (!token) {
    return requestRepo(createOctokit());
  }

  try {
    return await requestRepo(createOctokit(token));
  } catch (error) {
    if (!shouldRetryWithoutAuth(error)) {
      throw error;
    }

    return requestRepo(createOctokit());
  }
}

/**
 * Retrieves the authenticated user's data from GitHub.
 * @returns {Promise<any>} The user's data.
 */
export async function getUser() {
  const octokit = createOctokit(process.env.GH_TOKEN?.trim());
  const data = await octokit.rest.users.getAuthenticated();
  return data;
}

/**
 * Retrieves the repositories of the authenticated user.
 * @returns A Promise that resolves to the repositories list.
 */
export async function getRepos() {
  const token = process.env.GH_TOKEN?.trim();
  const requestRepos = async (octokit: Octokit) =>
    octokit.rest.repos.listForUser({
      username: "sametcn99",
      type: "owner",
      per_page: 100,
      sort: "updated",
    });

  if (!token) {
    return requestRepos(createOctokit());
  }

  try {
    return await requestRepos(createOctokit(token));
  } catch (error) {
    if (!shouldRetryWithoutAuth(error)) {
      throw error;
    }

    return requestRepos(createOctokit());
  }
}
