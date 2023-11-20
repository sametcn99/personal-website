"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Projects from "./projects";
import About from "./about";

export default function TabSwitcher() {
  const [isTabsFixed, setIsTabsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldFixTabs = window.scrollY > 300;
      setIsTabsFixed(shouldFixTabs);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex z-10 flex-col items-center w-full">
        <Tabs
          aria-label="Options"
          className={`w-full flex items-center justify-center z-50  p-2 ${
            isTabsFixed
              ? "fixed top-0 bg-black bg-transparent backdrop-blur-sm "
              : ""
          }`}
        >
          <Tab key="projects" title="Projects">
            <Projects />
          </Tab>
          <Tab key="about" title="About">
            <About />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
