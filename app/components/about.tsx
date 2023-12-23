import { Card, CardBody } from "@nextui-org/react";

export default function About() {
  return (
    <Card className="z-10 w-full max-w-[35rem] select-none gap-11 space-y-4 bg-opacity-50 text-sm text-white hover:scale-105">
      <CardBody className="text-wrap w-full break-words text-center">
        As a Software Developer with a associate degree in computer programming
        from Gazi University, I am passionate about developing innovative and
        user-friendly applications. I am currently working on enhancing my
        skills in full-stack web development to expand my knowledge and
        expertise in this field. I am interested in learning new technologies
        and frameworks that can help me create more efficient and effective web
        applications. I am also eager to apply my skills and knowledge to
        real-world problems and challenges, and to collaborate with other
        professionals and experts in the field.
      </CardBody>
    </Card>
  );
}
