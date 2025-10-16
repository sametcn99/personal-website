import RedirectClient from "@/components/RedirectClient";
import { socialMediaLinks } from "@/lib/social";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const socialSlugs = socialMediaLinks.flatMap((link) => link.type);
  return socialSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const social = socialMediaLinks.find((link) => link.type.includes(slug));
  if (social) {
    return {
      title: social.label,
      openGraph: {
        url: social.link.toString(),
      },
    };
  }
  return {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const social = socialMediaLinks.find((link) => link.type.includes(slug));

  if (!social) {
    notFound();
  }

  return <RedirectClient targetUrl={social.link.toString()} />;
}
