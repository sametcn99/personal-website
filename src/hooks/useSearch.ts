import { useCallback, useEffect, useState } from "react";

export const useSearch = (tabKey?: string) => {
  const storageKey = tabKey ? `search-query-${tabKey}` : "search-query";
  const [searchQuery, setSearchQuery] = useState("");

  // Load search query from localStorage on component mount
  useEffect(() => {
    const savedSearchQuery = localStorage.getItem(storageKey);
    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }
  }, [storageKey]);

  // Save search query to localStorage when it changes
  const handleSetSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (tabKey) {
        localStorage.setItem(storageKey, query);
      }
    },
    [tabKey, storageKey],
  );

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    if (tabKey) {
      localStorage.removeItem(storageKey);
    }
  }, [tabKey, storageKey]);

  // Handle ESC key press to clear search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && searchQuery) {
        clearSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchQuery, clearSearch]);

  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    clearSearch,
  };
};
