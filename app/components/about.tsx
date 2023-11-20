import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function About() {
  return (
    <Card className="z-10 m-5 space-y-4 text-white bg-opacity-50 select-none hover:scale-105 w-[35rem]">
      <CardBody>
        <p className="text-center">
          As a Software Developer with a associate degree in computer
          programming from Gazi University, I am passionate about developing
          innovative and user-friendly applications. <br />I am currently
          working on enhancing my skills in full-stack web development to expand
          my knowledge and expertise in this field. I am interested in learning
          new technologies and frameworks that can help me create more efficient
          and effective web applications. <br />I am also eager to apply my
          skills and knowledge to real-world problems and challenges, and to
          collaborate with other professionals and experts in the field.
        </p>
      </CardBody>
    </Card>
  );
}
