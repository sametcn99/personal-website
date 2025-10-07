import { socialMediaLinks } from "@/lib/social";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all possible slugs at build time
export async function generateStaticParams() {
  // Get all social media slugs
  const socialSlugs = socialMediaLinks.flatMap((link) => link.type);

  return socialSlugs.map((slug) => ({
    slug: slug,
  }));
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
  if (social) {
    permanentRedirect(social.link.toString());
  }
  notFound();
}
