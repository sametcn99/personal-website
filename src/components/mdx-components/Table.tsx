"use client";

import {
  alpha,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

export function TableComponent({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLTableElement>>) {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{
        my: 3,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
      }}
      aria-label="Table Container"
    >
      <Table {...props}>{children}</Table>
    </TableContainer>
  );
}

export function TableHeaderCell({
  children,
  ...props
}: React.PropsWithChildren<TableCellProps>) {
  const theme = useTheme();

  return (
    <TableCell
      sx={{
        fontWeight: "bold",
        bgcolor: alpha(theme.palette.primary.main, 0.04),
        color: theme.palette.text.secondary,
        borderBottom: `2px solid ${theme.palette.divider}`,
        py: 1.5,
      }}
      {...props}
      aria-label="Table Header Cell"
    >
      {children}
    </TableCell>
  );
}

export function TableDataCell({
  children,
  ...props
}: React.PropsWithChildren<TableCellProps>) {
  const theme = useTheme();

  return (
    <TableCell
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        py: 1.5,
      }}
      {...props}
      aria-label="Table Data Cell"
    >
      {children}
    </TableCell>
  );
}

export function TableHeadComponent({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>) {
  return <TableHead {...props}>{children}</TableHead>;
}

export function TableBodyComponent({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>) {
  return <TableBody {...props}>{children}</TableBody>;
}

export function TableRowComponent({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLTableRowElement>>) {
  return <TableRow {...props}>{children}</TableRow>;
}
