import ArticleWrapper from "@/components/ArticleWrapper";
import { formatDate, getBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import { CustomMDX } from "../../../components/mdx";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000";

type PageParams = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageParams) {
  const resolvedParams = await params;
  const post = getBlogPosts().find((post) => post.slug === resolvedParams.slug);
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
      url: `${baseUrl}/blog/${post.slug}`,
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

export default async function BlogPost({ params }: PageParams) {
  const resolvedParams = await params;
  const posts = getBlogPosts();
  const post = posts.find((post) => post.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Find current post index to get previous and next posts
  const currentIndex = posts.findIndex((p) => p.slug === resolvedParams.slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Transform data to match BlogData interface
  const transformToBlogData = (blogPost: typeof post) => ({
    href: `/blog/${blogPost.slug}`,
    title: blogPost.metadata.title,
    lastModified: blogPost.metadata.publishedAt,
  });

  const currentPost = transformToBlogData(post);
  const prevPostData = prevPost ? transformToBlogData(prevPost) : null;
  const nextPostData = nextPost ? transformToBlogData(nextPost) : null;

  return (
    <ArticleWrapper
      currentArticle={currentPost}
      prevArticle={prevPostData}
      nextArticle={nextPostData}
      postContent={post.content}
      contentType="post"
      publishedLabel="Published"
      prevLabel="Previous Post"
      nextLabel="Next Post"
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: post.metadata.author || "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <div className="flex items-center gap-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
          {post.metadata.author && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              by {post.metadata.author}
            </p>
          )}
        </div>
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="flex gap-2">
            {post.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </ArticleWrapper>
  );
}
