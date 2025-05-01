'use client';

import { Table, TableCell, TableContainer, Paper, alpha, TableCellProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

export function TableComponent({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLTableElement>>) {
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
    >
      <Table {...props}>{children}</Table>
    </TableContainer>
  );
}

export function TableHeaderCell({ children, ...props }: React.PropsWithChildren<TableCellProps>) {
  const theme = useTheme();
  
  return (
    <TableCell 
      sx={{ 
        fontWeight: "bold", 
        bgcolor: alpha(theme.palette.primary.main, 0.08),
        color: theme.palette.text.primary,
        borderBottom: `2px solid ${theme.palette.divider}`,
        py: 1.5,
      }} 
      {...props}
    >
      {children}
    </TableCell>
  );
}

export function TableDataCell({ children, ...props }: React.PropsWithChildren<TableCellProps>) {
  const theme = useTheme();
  
  return (
    <TableCell 
      sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        py: 1.5,
      }} 
      {...props}
    >
      {children}
    </TableCell>
  );
}
