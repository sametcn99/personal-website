import RedirectClient from "@/components/RedirectClient";
import { getRepo } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const repo = await getRepo(slug);
  if (repo) {
    return {
      title: repo.data.full_name,
      description: repo.data.description,
      openGraph: {
        images: [repo.data.owner.avatar_url],
        url: repo.data.html_url,
      },
    };
  }
  return {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const repo = await getRepo(slug);
  if (repo) {
    return <RedirectClient targetUrl={repo.data.html_url} />;
  }
  notFound();
}
