import NotFound from "@/app/not-found";
import { socialMediaLinks } from "@/lib/contact-links";
import { GitHubRepo } from "@/types";
import { fetchRepo } from "@/utils/utils";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const socialMediaLink = socialMediaLinks.find(
      (link) => link.type === params.slug,
    );
    if (socialMediaLink) {
      const { label } = socialMediaLink;
      return {
        title: `${label} | Samet Can Cıncık`,
        description: `My ${label} Profile`,
        openGraph: {
          title: `${label} | Samet Can Cıncık`,
          description: `My ${label} Profile`,
        },
      };
    }

    const repo = await fetchRepo(params.slug);
    const data: GitHubRepo = repo.data;

    if (!repo.error) {
      const { name, description, topics } = data;
      const title = `${name} | Samet Can Cıncık`;
      return {
        title,
        description,
        keywords: topics,
        openGraph: { title, description },
      };
    } else {
      return { title: `Not Found | Samet Can Cıncık` };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
    throw error;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const socialMediaLink = socialMediaLinks.find(
      (link) => link.type === params.slug,
    );

    if (socialMediaLink) {
      redirect(`/redirect?url=${socialMediaLink.link}`);
      return null; // Ensure to return null after redirect
    }

    const repo = await fetchRepo(params.slug);
    const data: GitHubRepo = repo.data;

    if (!repo.error) {
      redirect(`/redirect?url=${data.html_url}`);
      return null; // Ensure to return null after redirect
    } else {
      return <NotFound />;
    }
  } catch (error) {
    console.error("Error processing page:", error);
    throw error;
  }
}
