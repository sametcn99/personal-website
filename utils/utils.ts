// lib/utils.ts

/**
 * Determines if the application is running in a production environment.
 */
const isProduction: boolean = process.env.NODE_ENV === "production";

/**
 * The base URL for both production and local development environments.
 * Use the actual production URL when in production.
 */
export const siteUrl: string = isProduction
  ? "https://sametcc.me"
  : "http://localhost:3000";

export async function fetchRepo(slug: string) {
  try {
    const response = await fetch(
      `${siteUrl}/api/github?username=sametcn99&option=repo&reponame=${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch repository: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching repository:", error);
    throw error;
  }
}
export const sortByDateDesc = (property: string) => (a: any, b: any) =>
  new Date(b[property]).getTime() - new Date(a[property]).getTime();
