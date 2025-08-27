import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts and articles",
};

export default function BlogPage() {
  return (
    <div>
      <h1>Blog</h1>
      <p>Welcome to the blog section. Blog posts will be available here.</p>
    </div>
  );
}