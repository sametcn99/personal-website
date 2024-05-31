export async function fetchRepo(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/github?username=sametcn99&option=repo&reponame=${slug}`;
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
