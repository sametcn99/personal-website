import { useCallback, useEffect, useState } from "react";

export type SortBy = "title" | "date";
export type SortOrder = "asc" | "desc";

export const useSort = (tabKey?: string) => {
  const sortByKey = tabKey ? `content-sort-by-${tabKey}` : "content-sort-by";
  const sortOrderKey = tabKey
    ? `content-sort-order-${tabKey}`
    : "content-sort-order";

  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Load sort preferences from localStorage on component mount
  useEffect(() => {
    const savedSortBy = localStorage.getItem(sortByKey) as SortBy | null;
    const savedSortOrder = localStorage.getItem(
      sortOrderKey,
    ) as SortOrder | null;

    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, [sortByKey, sortOrderKey]);

  // Save sort preferences to localStorage when they change
  const handleSetSortBy = useCallback(
    (newSortBy: SortBy) => {
      setSortBy(newSortBy);
      if (tabKey) {
        localStorage.setItem(sortByKey, newSortBy);
      }
    },
    [tabKey, sortByKey],
  );

  const handleSetSortOrder = useCallback(
    (newSortOrder: SortOrder) => {
      setSortOrder(newSortOrder);
      if (tabKey) {
        localStorage.setItem(sortOrderKey, newSortOrder);
      }
    },
    [tabKey, sortOrderKey],
  );

  return {
    sortBy,
    setSortBy: handleSetSortBy,
    sortOrder,
    setSortOrder: handleSetSortOrder,
  };
};
