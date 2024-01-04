import { Button } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

export default function CardButton({ ...props }) {
  return (
    <Link
      href={`/redirect?url=${props.href}`} // Set the 'href' attribute of the link to the social media URL.
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
        {props.title}
        {props.logo}
      </Button>
    </Link>
  );
}
