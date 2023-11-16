"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Tooltip } from "@nextui-org/react";
import hello from "@/lib/hello.json";

interface GreetingData {
  loading: boolean;
  greeting: string;
  greetingLanguage: string;
}
export default function Greeting() {
  const [greetingData, setGreetingData] = useState<GreetingData>({
    loading: true,
    greeting: "Hello World",
    greetingLanguage: "English",
  });

  const { greetings } = hello;
  const greetingsArray = useMemo(() => Object.values(greetings), [greetings]);
  const greetingLanguageArray = useMemo(
    () => Object.keys(greetings),
    [greetings]
  );
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovering) {
        const randomIndex = Math.floor(Math.random() * greetingsArray.length);
        const randomGreeting = greetingsArray[randomIndex];
        const randomGreetingLanguage = greetingLanguageArray[randomIndex];
        setGreetingLanguageAndGreeting(randomGreetingLanguage, randomGreeting);
        setGreetingData((prevData) => ({
          ...prevData,
          loading: false,
        }));
      }
    }, 800);

    return () => clearInterval(interval);
  }, [greetingLanguageArray, greetingsArray, hovering]);

  const setGreetingLanguageAndGreeting = useMemo(() => {
    return (language: string, greeting: string) => {
      setGreetingData((prevData) => ({
        ...prevData,
        greetingLanguage: language,
        greeting: greeting,
      }));
    };
  }, []);

  return (
    <h1
      className="flex sticky z-10 justify-center items-center text-5xl font-bold text-center select-none w-[20rem] h-[10rem] break-words"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Tooltip
        content={greetingData.greetingLanguage}
        delay={0}
        closeDelay={0}
        color="primary"
        showArrow={true}
        isOpen={hovering}
      >
        {greetingData.loading ? (
          <span className="animate-pulse">{greetingData.greeting}</span>
        ) : (
          <span>{greetingData.greeting}</span>
        )}
      </Tooltip>
    </h1>
  );
}
