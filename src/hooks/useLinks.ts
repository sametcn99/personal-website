import { useMemo, useState } from "react";
import { categoryOrder, socialMediaLinks } from "@/lib/social";

export const useLinks = () => {
  const [showAllLinks, setShowAllLinks] = useState(false);

  const visibleLinks = socialMediaLinks
    .filter((link) => link.visible)
    .sort((a, b) => {
      // First, sort by category order
      const categoryOrderA = categoryOrder[a.category] || Number.MAX_VALUE;
      const categoryOrderB = categoryOrder[b.category] || Number.MAX_VALUE;

      if (categoryOrderA !== categoryOrderB) {
        return categoryOrderA - categoryOrderB;
      }

      // If categories have the same order, sort by label
      return a.label.localeCompare(b.label);
    });

  // Group links by category
  const linksByCategory = useMemo(() => {
    const grouped = visibleLinks.reduce(
      (acc, link) => {
        if (!acc[link.category]) {
          acc[link.category] = [];
        }
        acc[link.category].push(link);
        return acc;
      },
      {} as Record<string, typeof visibleLinks>,
    );

    return grouped;
  }, [visibleLinks]);

  const hiddenLinks = socialMediaLinks
    .filter((link) => !link.visible)
    .sort((a, b) => a.label.localeCompare(b.label));

  return {
    showAllLinks,
    setShowAllLinks,
    visibleLinks,
    linksByCategory,
    hiddenLinks,
  };
};
