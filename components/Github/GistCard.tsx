import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
export default function GistCard({ gist, index }: any) {
  return (
    <Card className="card-container" key={`${gist.id}-${index}`}>
      <CardHeader className="card-header">
        <div className="flex flex-col items-start">
          {Object.keys(gist.files).map((filename, index) => (
            <div key={index}>{filename}</div>
          ))}
        </div>
        <Link
          href={`/redirect?url=${gist.html_url}`} // Set the 'href' attribute of the link to the social media URL.
          target="_blank"
        >
          <Button
            className={
              "border border-white border-opacity-50 fill-white text-foreground transition-all duration-1000 hover:bg-zinc-700 hover:bg-opacity-50"
            }
            radius="sm"
            size="sm"
            variant={"bordered"}
          >
            <span>Source Code</span>
            <GitHubIcon className="fill-white text-sm" />
          </Button>
        </Link>
      </CardHeader>
      <CardBody className="card-body">{gist.description}</CardBody>
      <CardFooter className="card-footer">
        <p>Created at: {new Date(gist.created_at).toLocaleDateString()}</p>
        <p>Last update: {new Date(gist.updated_at).toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
}
