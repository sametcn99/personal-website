"use client";

import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export default function ClarityAnalytics() {
  useEffect(() => {
    Clarity.init("v0hk85cpw6");
  }, []);

  return null;
}
