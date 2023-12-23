import { Button } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

export default function CardButtons({ ...props }) {
  return (
    <Link href={props.href} target="_blank">
      <Button
        className={
          "text-foreground border border-opacity-50 border-white hover:bg-opacity-50 hover:bg-zinc-700 transition-all duration-1000 fill-white"
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
