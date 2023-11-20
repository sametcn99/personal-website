"use client";
import { useState } from "react";
import Image from "next/image";
import Greeting from "./components/greeting";
import Buttons from "./components/buttons";
import Projects from "./components/projects";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <section className="flex z-10 flex-col justify-center items-center md:-mb-[12rem] sm:-mb-[12rem] -mb-[10rem]  min-h-screen">
        {!imageLoaded && (
          <div className="flex absolute justify-center items-center rounded-full animate-pulse w-[500px] h-[500px]"></div>
        )}
        <Image
          src={"/blobanimation.svg"} // Assuming the image path is correct
          alt="Picture of the author"
          width={600}
          height={600}
          priority
          loading="eager"
          className={`flex absolute justify-center items-center select-none  z--10 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          onDragStart={(e) => e.preventDefault()} // Prevent dragging
        />
        <Greeting />
        <div className="z-0 text-sm font-extralight select-none text-white">
          I&apos;m a Web Developer from Turkey
        </div>
        <Buttons />
      </section>
      <Projects />
    </>
  );
}
