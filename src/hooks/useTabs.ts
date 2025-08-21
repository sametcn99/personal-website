import { useState } from "react";

export const useTabs = () => {
  const [tabValue, setTabValue] = useState(0);

  return {
    tabValue,
    setTabValue,
  };
};
