import {
  backendTechnologies,
  databases,
  designTools,
  desktopMobileDevelopment,
  frontendFrameworks,
  languages,
  uiFrameworks,
} from "@/lib/tech-stack";
import React from "react";
import TechStackItems from "./TechStackItems";
import { Card } from "@nextui-org/react";

export default function TechStack() {
  return (
    <>
      <section
        className="flex w-fit flex-col flex-wrap gap-4 pt-3"
        id="tech-stack"
      >
        <h1 className="text-center text-3xl font-bold">Tech Stack</h1>
        <div>
          <h1 className="ml-2 text-xl font-bold">Programming Languages</h1>
          <Card className="tech-stack-card">
            {languages.map((item, index) => (
              <TechStackItems key={index} item={item} />
            ))}
          </Card>
        </div>
        <div>
          <h1 className="ml-2 text-xl font-bold">Frontend Frameworks</h1>
          <Card className="tech-stack-card">
            {frontendFrameworks.map((item, index) => (
              <TechStackItems key={index} item={item} />
            ))}
          </Card>
        </div>
        <div>
          <h1 className="ml-2 text-xl font-bold">Backend Technologies</h1>
          <Card className="tech-stack-card">
            {backendTechnologies.map((item, index) => (
              <TechStackItems key={index} item={item} />
            ))}
          </Card>
        </div>
        <div>
          <h1 className="ml-2 text-xl font-bold">Database Technologies</h1>
          <Card className="tech-stack-card">
            {databases.map((item, index) => (
              <TechStackItems key={index} item={item} />
            ))}
          </Card>
        </div>
        <div>
          <h1 className="ml-2 text-xl font-bold">Design Tools</h1>
          <Card className="tech-stack-card">
            {designTools.map((item, index) => (
              <TechStackItems key={index} item={item} />
            ))}
          </Card>
        </div>
        <div>
          {" "}
          <h1 className="ml-2 text-xl font-bold">
            Desktop and Mobile Development
          </h1>
          <Card className="tech-stack-card">
            {desktopMobileDevelopment.map((item, index) => (
              <TechStackItems key={index} item={item} />
            ))}
          </Card>
        </div>
        <div>
          <h1 className="ml-2 text-xl font-bold">
            UI Frameworks and Libraries
          </h1>
          <Card className="tech-stack-card">
            {uiFrameworks.map((item, index) => (
              <TechStackItems key={index} item={item} />
            ))}
          </Card>
        </div>
      </section>
    </>
  );
}
