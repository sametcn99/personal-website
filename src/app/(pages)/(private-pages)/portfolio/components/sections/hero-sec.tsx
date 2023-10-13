"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import hello from "../../lib/hello.json";
import Tooltip from "@mui/material/Tooltip";

/**
 * Renders the hero section of the portfolio page.
 * @returns JSX element
 */
export default function HeroSec() {
  const [greeting, setGreeting] = useState("Hello World");
  const [greetingLanguage, setGreetingLanguage] = useState("English");

  const greetingsArray = Object.values(hello.greetings);
  const greetingLanguageArray = Object.keys(hello.greetings);
  const [hovering, setHovering] = useState(false); // New state variable

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovering) {
        // Check if not hovering
        const randomIndex = Math.floor(Math.random() * greetingsArray.length);
        const randomGreeting = greetingsArray[randomIndex];
        const randomGreetingLanguage = greetingLanguageArray[randomIndex];
        setGreetingLanguage(randomGreetingLanguage);
        setGreeting(randomGreeting);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [greetingLanguageArray, greetingsArray, hovering]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 150);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 1000);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center select-none"
      id="hero-sec"
    >
      <Image
        src={"blobanimation.svg"}
        alt="Picture of the author"
        width={500}
        height={500}
        loading="lazy"
        className="absolute flex justify-center items-center lg:scale-100 md:scale-75 sm:scale-50 scale-50"
      />
      <span className="text-white text-center space-y-2 z-10 lg:scale-100 md:scale-90 scale-75">
        <h1 className="text-5xl font-bold">
          <Tooltip title={greetingLanguage} followCursor enterTouchDelay={0}>
            <span
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {greeting}
            </span>
          </Tooltip>
          <br />
          <span>I&apos;m a Full-Stack Software Developer</span>
          <br />
          <span className="text-3xl">Welcome to my portfolio!</span>
        </h1>
      </span>
    </div>
  );
}
