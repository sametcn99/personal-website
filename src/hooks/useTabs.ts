import { useEffect, useState } from "react";

const TAB_STORAGE_KEY = "selectedTab";

export const useTabs = () => {
  // Always start with 0 for consistent SSR
  const [tabValue, setTabValueState] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on the client side
  useEffect(() => {
    setIsClient(true);
    // Load saved tab value from localStorage once client is ready
    const savedTab = localStorage.getItem(TAB_STORAGE_KEY);
    if (savedTab) {
      const parsedTab = parseInt(savedTab, 10);
      if (!Number.isNaN(parsedTab)) {
        setTabValueState(parsedTab);
      }
    }
  }, []);

  // Custom setter that also saves to localStorage
  const setTabValue = (value: number) => {
    setTabValueState(value);
    if (isClient) {
      localStorage.setItem(TAB_STORAGE_KEY, value.toString());
    }
  };

  return {
    tabValue,
    setTabValue,
  };
};
