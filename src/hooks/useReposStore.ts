"use client";

import { create } from "zustand";

/**
 * Defines the shape of the repositories API response.
 */
interface ReposApiResponse {
  repos?: ContentMetadata[];
}

/**
 * Defines the global repositories store contract.
 */
interface ReposStore {
  repos: ContentMetadata[];
  isLoading: boolean;
  hasFetched: boolean;
  errorMessage: string | null;
  fetchRepos: () => Promise<void>;
}

let inFlightFetch: Promise<void> | null = null;

/**
 * Checks if cached repositories contain created/updated date metadata.
 */
function hasRepoDateMetadata(repos: ContentMetadata[]): boolean {
  const repoItems = repos.filter((repo) => repo.href.startsWith("/repo/"));

  if (repoItems.length === 0) {
    return false;
  }

  return repoItems.some((repo) => !!repo.createdAt || !!repo.updatedAt);
}

/**
 * Fetches repositories from the API route.
 */
async function requestRepos(): Promise<ContentMetadata[]> {
  const response = await fetch("/api/repos", { method: "GET" });

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  const data = (await response.json()) as ReposApiResponse;
  return Array.isArray(data.repos) ? data.repos : [];
}

/**
 * Provides a shared repositories state across the whole app.
 */
export const useReposStore = create<ReposStore>((set, get) => ({
  repos: [],
  isLoading: false,
  hasFetched: false,
  errorMessage: null,
  fetchRepos: async () => {
    const { hasFetched, isLoading, repos } = get();
    const hasValidDates = hasRepoDateMetadata(repos);

    if (hasFetched && hasValidDates) {
      return;
    }

    if (isLoading && inFlightFetch) {
      await inFlightFetch;
      return;
    }

    set({ isLoading: true, errorMessage: null });

    inFlightFetch = (async () => {
      try {
        const repos = await requestRepos();
        set({ repos, hasFetched: true, isLoading: false });
      } catch (error) {
        set({
          errorMessage:
            error instanceof Error
              ? error.message
              : "Failed to fetch repositories",
          isLoading: false,
        });
      } finally {
        inFlightFetch = null;
      }
    })();

    await inFlightFetch;
  },
}));
