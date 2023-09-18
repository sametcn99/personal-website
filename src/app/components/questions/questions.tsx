import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentData from "../../content/content-data.json";
import { motion } from "framer-motion";

interface DataItem {
  title: string;
  content: string;
}

export default function Questions() {
  const container = {
    hidden: { opacity: 1, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation item variants
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // State to control the open state of each Accordion item
  const [expanded, setExpanded] = useState<string | false>(false);

  // Function to handle Accordion item toggle
  const handleAccordionToggle =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <main className="flex select-none space-y-9 lg:pl-20 lg:pr-20">
      <motion.ul
        className="mt-16 space-y-3 p-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {ContentData.map((data: DataItem, index: number) => (
          <motion.li
            variants={item}
            key={index}
            className="rounded-lg text-center "
          >
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleAccordionToggle(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography className="uppercase font-black text-xl">
                  {data.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>{data.content}</AccordionDetails>
            </Accordion>
          </motion.li>
        ))}
      </motion.ul>
    </main>
  );
}
