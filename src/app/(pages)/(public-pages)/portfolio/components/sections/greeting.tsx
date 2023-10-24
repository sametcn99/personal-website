"use client";
import React, { useEffect, useState } from "react";
import hello from "../../lib/hello.json";
import Tooltip from "@mui/material/Tooltip";

export default function Greeting() {
  const [greeting, setGreeting] = useState("Hello World");
  const [greetingLanguage, setGreetingLanguage] = useState("English");
  const greetingsArray = Object.values(hello.greetings);
  const greetingLanguageArray = Object.keys(hello.greetings);
  const [hovering, setHovering] = useState(false);

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
  return (
    <h1 className="text-5xl font-bold">
      <Tooltip
        title={greetingLanguage}
        followCursor
        enterTouchDelay={0}
        leaveTouchDelay={5000}
      >
        <span
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {greeting}
        </span>
      </Tooltip>
    </h1>
  );
}
