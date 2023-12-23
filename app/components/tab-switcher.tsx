"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Projects from "./projects";
import About from "./about";
import Gists from "./gists";

export default function TabSwitcher() {
  return (
    <>
      <div className="z-10 flex min-h-screen w-full select-none flex-col items-center p-5">
        <Tabs
          defaultSelectedKey={"projects"}
          aria-label="Options"
          className={`sticky top-0 z-50 flex w-full items-center justify-center p-2 `}
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
