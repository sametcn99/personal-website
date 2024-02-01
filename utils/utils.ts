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
  const url = `${siteUrl}/api/github?username=sametcn99&option=repo&reponame=${slug}`;
  console.log("url", url);
  try {
    const response = await fetch(url, {});
    if (!response.ok) {
      throw new Error(`Failed to fetch repository: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching repository:", error);
    throw error;
  }
}
export const sortByDateDesc = (property: string) => (a: any, b: any) =>
  new Date(b[property]).getTime() - new Date(a[property]).getTime();
