"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Greeting from "./components/Greeting";
import Buttons from "./components/Buttons";
import TabSwitcher from "./components/ TabSwitcher";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [sectionOpacity, setSectionOpacity] = useState(1);
  const [sectionLoad, setSectionLoad] = useState(true);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const maxScroll = 200; // Adjust this value based on when you want the section to disappear
      const newOpacity = 1 - Math.min(scrollY / maxScroll, 1);
      if (newOpacity === 0) {
        setSectionLoad(false);
      } else {
        setSectionLoad(true);
      }

      setSectionOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);
  return (
    <>
      <section className="z-10 mb-[-5rem] flex min-h-screen flex-col items-center justify-center">
        {!imageLoaded && (
          <div className="absolute flex h-[500px] w-[500px] animate-pulse items-center justify-center rounded-full"></div>
        )}
        <Image
          src={"/blobanimation.svg"} // Assuming the image path is correct
          alt="Picture of the author"
          width={600}
          height={600}
          priority
          loading="eager"
          className={`fixed  z--10 flex select-none items-center  justify-center ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          onDragStart={(e) => e.preventDefault()} // Prevent dragging
        />
        {sectionLoad ? (
          <>
            <section
              style={{ opacity: sectionOpacity }}
              className="flex flex-col items-center justify-center transition duration-1000"
            >
              <Greeting />
              <div className="z-0 select-none text-sm font-extralight text-white">
                I&apos;m a Web Developer from Turkey
              </div>
              <Buttons />
            </section>
          </>
        ) : (
          <></>
        )}
      </section>
      <TabSwitcher />
    </>
  );
}
