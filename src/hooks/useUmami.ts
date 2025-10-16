import { useCallback } from "react";

// Defines the structure for custom event data (key-value pairs).
interface UmamiEventData {
  [key: string]: string | number | boolean | null | undefined;
}

// Global type definition for the Umami object on the window.
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: UmamiEventData) => void;
    };
  }
}

/**
 * Collects dynamic, anonymous data about the user's browser environment and context.
 * This function should only be executed in a browser environment.
 * @returns {UmamiEventData} Dynamic data to be sent with every event.
 */
const getDynamicContextData = (): UmamiEventData => {
  if (typeof window === "undefined") {
    return {}; // Return empty object if not running in the browser (e.g., during SSR)
  }

  // --- ANONYMIZED USER/DEVICE DATA ---
  const screenWidth = window.screen.width;
  const isMobile = screenWidth < 768; // Simple heuristic to classify device type

  // --- PAGE CONTEXT DATA ---
  const currentPath = window.location.pathname;
  const pageTitle = document.title;

  return {
    isMobile,
    currentPath,
    pageTitle,
  };
};

/**
 * A type-safe React Hook for reliably tracking custom Umami events in a Next.js environment.
 * It automatically merges static app data, dynamic user context data, and custom event data.
 *
 * @returns {object} trackEvent: A function to trigger a custom Umami event.
 */
export const useUmami = () => {
  const trackEvent = useCallback(
    (eventName: string, eventData: UmamiEventData = {}) => {
      // 1. Merge Data: Custom event data overrides dynamic and base data if keys overlap.
      const dynamicData = getDynamicContextData();
      const mergedData = {
        ...dynamicData,
        ...eventData,
      };
      if (typeof window !== "undefined" && window.umami) {
        window.umami.track(eventName, mergedData);
      }
    },
    [],
  );

  return { trackEvent };
};
