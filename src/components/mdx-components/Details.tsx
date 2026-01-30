"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Children, isValidElement, type ReactNode } from "react";

interface DetailsProps {
  children?: ReactNode;
  open?: boolean;
}

interface SummaryProps {
  children?: ReactNode;
}

/**
 * Renders HTML `<summary>` element.
 * Content is extracted by DetailsComponent for the accordion header.
 */
export function SummaryComponent({ children }: SummaryProps) {
  return <>{children}</>;
}

SummaryComponent.displayName = "SummaryComponent";

/**
 * Renders HTML `<details>` element as MUI Accordion component.
 * Automatically extracts the first child (summary) as the accordion header.
 */
export function DetailsComponent({ children, open = false }: DetailsProps) {
  const theme = useTheme();

  // Separate summary from content
  // In HTML, the first child of <details> is always <summary>
  const childArray = Children.toArray(children);
  let summaryContent: ReactNode = "Details";
  const contentChildren: ReactNode[] = [];

  childArray.forEach((child, index) => {
    // First child is always the summary
    if (index === 0 && isValidElement(child)) {
      // Extract the children from the Summary component
      const props = child.props as { children?: ReactNode };
      summaryContent = props.children;
    } else {
      contentChildren.push(child);
    }
  });

  return (
    <Accordion
      defaultExpanded={open}
      disableGutters
      elevation={0}
      sx={{
        my: 2,
        border: 1,
        borderColor: alpha(theme.palette.divider, 0.3),
        borderRadius: 2,
        overflow: "hidden",
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          my: 2,
        },
        bgcolor: alpha(theme.palette.background.paper, 0.5),
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          borderBottom: 1,
          borderColor: alpha(theme.palette.divider, 0.2),
          "&:hover": {
            bgcolor: alpha(theme.palette.primary.main, 0.08),
          },
          "& .MuiAccordionSummary-content": {
            my: 1.5,
          },
        }}
      >
        <Typography
          variant="subtitle1"
          component="span"
          sx={{ fontWeight: 600 }}
        >
          {summaryContent}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          p: 2,
          "& > *:first-of-type": {
            mt: 0,
          },
          "& > *:last-child": {
            mb: 0,
          },
        }}
      >
        {contentChildren}
      </AccordionDetails>
    </Accordion>
  );
}

DetailsComponent.displayName = "DetailsComponent";
