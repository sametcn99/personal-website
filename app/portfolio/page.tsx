"use client";
import { useState } from "react";
import Image from "next/image";
import Buttons from "./components/buttons";
import Greeting from "./components/greeting";

export default function Portfolio() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section className="flex flex-col justify-center items-center space-y-6 h-full">
      {!imageLoaded && (
        <div className="bg-zinc-950 flex absolute justify-center items-center animate-pulse rounded-full w-[500px] h-[500px]"></div>
      )}
      <Image
        src={"/blobanimation.svg"} // Assuming the image path is correct
        alt="Picture of the author"
        width={500}
        height={500}
        loading="lazy"
        className={`flex absolute justify-center items-center ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImageLoad}
      />
      <Greeting />
      <Buttons />
    </section>
  );
}
