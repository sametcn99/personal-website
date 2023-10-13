"use client";
import Image from "next/image";
import hello from "../../lib/hello.json";
import { useEffect, useState } from "react";

/**
 * Renders the hero section of the portfolio page.
 * @returns JSX element
 */
export default function HeroSec() {
  const [greeting, setGreeting] = useState("Hello World");
  const greetingsArray = Object.values(hello.greetings);

  useEffect(() => {
    /**
     * Sets a random greeting from an array of greetings every second using setInterval.
     */
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * greetingsArray.length);
      const randomGreeting = greetingsArray[randomIndex];
      setGreeting(randomGreeting);
    }, 1000);
    return () => clearInterval(interval);
  }, [greetingsArray]);

  useEffect(() => {
    /**
     * Scrolls the window to a specific position and then back to the top after a delay.
     * @param {number} delay - The delay in milliseconds before scrolling back to the top.
     */
    const timeout = setTimeout(() => {
      window.scrollTo(0, 100);
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
        className="absolute flex justify-center items-center"
      />
      <span className="text-white text-center space-y-2 z-10">
        <h1 className="text-5xl font-bold">
          <span>{greeting}</span>
          <br />
          <span>I&apos;m a Full-Stack Software Developer</span>
          <br />
          <span className="text-3xl">Welcome to my portfolio!</span>
        </h1>
      </span>
    </div>
  );
}
