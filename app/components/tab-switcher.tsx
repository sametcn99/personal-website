"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Projects from "./projects";
import About from "./about";
import Gists from "./gists";

export default function TabSwitcher() {
  return (
    <>
      <div className="flex z-10 flex-col items-center p-5 w-full min-h-screen select-none">
        <Tabs
          defaultSelectedKey={"projects"}
          aria-label="Options"
          className={`w-full flex items-center justify-center z-50 p-2 sticky top-0 `}
        >
          <Tab key="projects" title="Projects">
            <Projects />
          </Tab>
          <Tab key="gists" title="Gists">
            <Gists />
          </Tab>
          <Tab key="about" title="About">
            <About />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
