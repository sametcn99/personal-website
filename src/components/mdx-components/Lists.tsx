"use client";

import type { ListItemProps, ListProps } from "@mui/material";
import { List, ListItem } from "@mui/material";
import type React from "react";

export function UnorderedList({
  children,
  ...props
}: React.PropsWithChildren<ListProps>) {
  return (
    <List
      component="ul"
      sx={{
        my: 3,
        ml: 3,
        listStyleType: "disc",
        "& li": {
          pl: 1,
          pb: 0.5,
        },
      }}
      {...props}
      aria-label="Unordered List"
    >
      {children}
    </List>
  );
}

export function OrderedList({
  children,
  ...props
}: React.PropsWithChildren<ListProps>) {
  return (
    <List
      component="ol"
      sx={{
        my: 3,
        ml: 3,
        listStyleType: "decimal",
        "& li": {
          pl: 1,
          pb: 0.5,
        },
      }}
      {...props}
      aria-label="Ordered List"
    >
      {children}
    </List>
  );
}

export function ListItemComponent({
  children,
  ...props
}: React.PropsWithChildren<ListItemProps>) {
  return (
    <ListItem
      sx={{
        display: "list-item",
        py: 0.5,
      }}
      {...props}
      aria-label="List Item"
    >
      {children}
    </ListItem>
  );
}
