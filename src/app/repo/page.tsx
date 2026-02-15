import type { Metadata } from "next";
import RepoPageContent from "@/components/repo/RepoPageContent";

export const metadata: Metadata = {
  title: "Repositories",
  openGraph: {
    title: "Repositories",
  },
};

/**
 * Renders repositories page using the shared repositories state.
 */
export default function RepoPage() {
  return <RepoPageContent />;
}
