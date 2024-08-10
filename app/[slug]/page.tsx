import NotFound from "@/app/not-found";
import { socialMediaLinks } from "@/lib/contact-links";
import { GitHubRepo } from "@/types";
import { fetchRepo } from "@/utils/utils";
import { permanentRedirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const socialMediaLink = socialMediaLinks.find((link) =>
      link.type.includes(params.slug),
    );
    if (socialMediaLink) {
      const { label } = socialMediaLink;
      return {
        title: label,
        description: label,
        openGraph: {
          title: label,
          description: label,
        },
      };
    }

    const repo = await fetchRepo(params.slug);
    const data: GitHubRepo = repo.data;

    if (!repo.error) {
      const { name, description, topics } = data;
      const title = `${name}`;
      return {
        title,
        description,
        keywords: topics,
        openGraph: { title, description },
      };
    } else {
      return { title: `Not Found` };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
    throw error;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const socialMediaLink = socialMediaLinks.find((link) =>
    link.type.includes(params.slug),
  );
  socialMediaLink ? permanentRedirect(`${socialMediaLink.link}`) : null;
  const repo = await fetchRepo(params.slug);
  const data: GitHubRepo = repo.data;
  return !repo.error ? permanentRedirect(`${data.html_url}`) : <NotFound />;
}
