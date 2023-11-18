"use client";
import { useState } from "react";
import Image from "next/image";
import Greeting from "./components/greeting";
import Buttons from "./components/buttons";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section className="flex flex-col justify-center items-center h-full">
      {!imageLoaded && (
        <div className="flex absolute justify-center items-center rounded-full animate-pulse w-[500px] h-[500px]"></div>
      )}
      <Image
        src={"/blobanimation.svg"} // Assuming the image path is correct
        alt="Picture of the author"
        width={500}
        height={500}
        priority
        loading="eager"
        className={`flex absolute justify-center items-center select-none ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImageLoad}
        onDragStart={(e) => e.preventDefault()} // Prevent dragging
      />
      <Greeting />
      <Buttons />
    </section>
  );
}
