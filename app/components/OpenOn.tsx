import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function OpenOn({ ...props }) {
  return (
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
        <DropdownItem key="open on github" href={props.github}>
          Github
        </DropdownItem>
        <DropdownItem
          key="open on github ide"
          href={`/redirect?url=${props.githubide}`}
        >
          Github IDE
        </DropdownItem>
        {props.demo && (
          <DropdownItem key="open demo" href={`/redirect?url=${props.demo}`}>
            Website(DEMO)
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
