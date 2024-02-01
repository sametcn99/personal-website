import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import StarIcon from "@mui/icons-material/Star";
import { siteUrl } from "@/utils/utils";

export default function RepoCard({ project, index }: any) {
  return (
    <Card className="card-container" key={`${project.id}-${index}`}>
      <CardHeader className="card-header">
        <div className="flex flex-row flex-wrap items-center">
          <h1 className="text-small font-semibold leading-none text-default-600 hover:font-bold">
            {project.name}
          </h1>
          {project.stargazers_count > 0 && (
            <Tooltip
              content="Total Stars"
              delay={0}
              closeDelay={0}
              className="select-none bg-opacity-60 light:bg-black dark:bg-white"
            >
              <div className="flex scale-85 items-center gap-2 font-bold">
                <StarIcon />
                {project.stargazers_count}
              </div>
            </Tooltip>
          )}
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="h-10 hover:bg-zinc-700 hover:bg-opacity-50"
            >
              Open
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="open on github"
              href={`${siteUrl}/${project.name}`}
            >
              Github
            </DropdownItem>
            <DropdownItem
              key="open on github ide"
              href={`/redirect?url=${project.html_url.replace(
                "github.com",
                "github.dev",
              )}`}
            >
              Github IDE
            </DropdownItem>
            <DropdownItem
              key="open demo"
              href={`/redirect?url=${
                project.homepage ? project.homepage : null
              }`}
            >
              Website(DEMO)
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="card-body">{project.description}</CardBody>
      <CardFooter className="card-footer">
        <div className="item flex flex-col flex-wrap gap-1 text-left text-xs">
          <p>{project.license?.spdx_id}</p>
          <p>{project.language ? `Language: ${project.language}` : null}</p>
          <p>Created at: {new Date(project.created_at).toLocaleDateString()}</p>
          <p>Last update: {new Date(project.pushed_at).toLocaleDateString()}</p>
        </div>
        <div className="jus flex flex-row flex-wrap">
          {project.topics.map((topic: any, index: any) => (
            <p
              key={index}
              className="m-[0.063rem] mb-1 select-none rounded-2xl bg-slate-400 bg-opacity-5 p-1 text-xs font-thin hover:font-normal dark:bg-slate-900"
            >
              {topic}
            </p>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
