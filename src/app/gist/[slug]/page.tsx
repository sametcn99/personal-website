import ArticleWrapper from "@/components/ArticleWrapper";
import { JsonLd } from "@/components/JsonLd";
import { formatDate, getGistPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import { CustomMDX } from "../../../components/mdx";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const posts = getGistPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageParams) {
  const resolvedParams = await params;
  const post = getGistPosts().find((post) => post.slug === resolvedParams.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/gist/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Gist({ params }: PageParams) {
  const resolvedParams = await params;
  const posts = getGistPosts();
  const post = posts.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Find current post index to get previous and next posts
  const currentIndex = posts.findIndex((p) => p.slug === resolvedParams.slug);
  const prevGist = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextGist =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Transform data to match GistData interface
  const transformToGistData = (gist: typeof post) => ({
    href: `/gist/${gist.slug}`,
    title: gist.metadata.title,
    lastModified: gist.metadata.publishedAt,
  });

  const currentGist = transformToGistData(post);
  const prevGistData = prevGist ? transformToGistData(prevGist) : null;
  const nextGistData = nextGist ? transformToGistData(nextGist) : null;

  return (
    <ArticleWrapper
      currentArticle={currentGist}
      prevArticle={prevGistData}
      nextArticle={nextGistData}
      contentType="gist"
      publishedLabel="Last updated"
      prevLabel="Previous Gist"
      nextLabel="Next Gist"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.metadata.title,
          datePublished: post.metadata.publishedAt,
          dateModified: post.metadata.publishedAt,
          description: post.metadata.summary,
          image: post.metadata.image
            ? `${baseUrl}${post.metadata.image}`
            : `/og?title=${encodeURIComponent(post.metadata.title)}`,
          url: `${baseUrl}/gist/${post.slug}`,
          author: {
            "@type": "Person",
            name: post.metadata.author || "sametcn99",
          },
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </ArticleWrapper>
  );
}
