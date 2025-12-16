import type { Metadata } from "next";
import RssPageContent from "../../components/RssPageContent";

export const metadata: Metadata = {
  title: "RSS Feed",
  description:
    "Subscribe to blog posts, gists, and projects via RSS or JSON Feed",
};

export default function RssPage() {
  return <RssPageContent />;
}
