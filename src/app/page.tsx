"use client";
import { IconButton } from "@mui/material";
import About from "./(pages)/about/page";
import Social from "./(pages)/social/page";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function Home() {
  return (
    <div>
      <About />
      <Social />
    </div>
  );
}
