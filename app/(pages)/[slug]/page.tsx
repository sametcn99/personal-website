import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import { GitHubRepo } from "@/types";
import { siteUrl } from "@/utils/utils";
import { Error } from "@mui/icons-material";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { redirect } from "next/navigation";

// Function to generate page metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const response = fetchRepo(params.slug);
  const repo = await (await response).json();
  const data: GitHubRepo = await repo.data;
  if (!repo.error) {
    return {
      title: `${data.name} | Samet Can Cıncık`, // Using the post's title as the title
      description: data.description,
      keywords: data.topics,
      openGraph: {
        title: `${data.name} | Samet Can Cıncık`, // Using the post's title as the title
        description: data.description,
      },
    };
  } else {
    return {
      title: `Not Found| Samet Can Cıncık`, // Using the post's title as the title
    };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const response = fetchRepo(params.slug);
  const repo = await (await response).json();
  const data: GitHubRepo = await repo.data;
  if (!repo.error) {
    redirect(`/redirect?url=${data.html_url}`);
  } else {
    return <NotFound />;
  }
}

async function fetchRepo(slug: string) {
  const response = await fetch(
    `${siteUrl}/api/github?username=sametcn99&option=repo&reponame=${slug}`,
    {
      next: { revalidate: 3600 },
    },
  );
  return response;
}
