"use client";

import React, { useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import hello from "@/lib/hello.json";

export default function Greeting() {
  const [greeting, setGreeting] = useState("Hello World");
  const [greetingLanguage, setGreetingLanguage] = useState("English");
  const [hovering, setHovering] = useState(false);

  const { greetings } = hello;
  const greetingsArray = Object.values(greetings);
  const greetingLanguageArray = Object.keys(greetings);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovering) {
        const randomIndex = Math.floor(Math.random() * greetingsArray.length);
        const randomGreeting = greetingsArray[randomIndex];
        const randomGreetingLanguage = greetingLanguageArray[randomIndex];
        setGreetingLanguageAndGreeting(randomGreetingLanguage, randomGreeting);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [greetingLanguageArray, greetingsArray, hovering]);

  const setGreetingLanguageAndGreeting = (language: any, greeting: any) => {
    setGreetingLanguage(language);
    setGreeting(greeting);
  };

  return (
    <h1
      className="flex sticky z-10 justify-center items-center text-5xl font-bold text-center select-none w-[20rem] h-[10rem] break-words"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Tooltip
        content={greetingLanguage}
        delay={0}
        closeDelay={0}
        color="primary"
        showArrow={true}
        isOpen={hovering}
      >
        <span>{greeting}</span>
      </Tooltip>
    </h1>
  );
}
