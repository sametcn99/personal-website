import NotFound from "@/app/not-found";
import { socialMediaLinks } from "@/lib/contact-links";
import { GitHubRepo } from "@/types";
import { fetchRepo } from "@/utils/utils";
import { redirect } from "next/navigation";

const resumeSlugs = ["cv", "resume", "ozgecmis"];

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
    if (resumeSlugs.includes(params.slug)) {
      return {
        title: `${params.slug} | Samet Can Cıncık`,
        description: `My ${params.slug}`,
        openGraph: {
          title: `${params.slug} | Samet Can Cıncık`,
          description: `My ${params.slug}`,
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

    if (resumeSlugs.includes(params.slug)) {
      redirect(
        "/redirect?url=https://docs.google.com/document/d/1lYhA_7M2-g0JzlqlZlDibM_bksowBTuSqkrVF-7moKs/edit?usp=sharing",
      );
      return null;
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
