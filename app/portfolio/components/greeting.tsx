"use client";
import React, { useEffect, useState } from "react";
import hello from "@/lib/hello.json";
import { Tooltip } from "@nextui-org/react";

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
    <h1
      className="flex sticky z-10 justify-center items-center text-5xl font-bold text-center select-none w-[20rem] h-[10rem]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Tooltip
        content={greetingLanguage}
        delay={0}
        closeDelay={0}
        color={"primary"}
        showArrow={true}
        isOpen={hovering}
      >
        <span>{greeting}</span>
      </Tooltip>
    </h1>
  );
}
