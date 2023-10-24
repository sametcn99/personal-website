import Image from "next/image";
import Greeting from "./greeting";

/**
 * Renders the hero section of the portfolio page.
 * @returns JSX element
 */
export default function HeroSec() {
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
      <span className="text-white text-center space-y-7 z-10 lg:scale-100 md:scale-90 scale-75">
        <Greeting />
        <h1 className="text-5xl font-bold">
          <span>I&apos;m a Full-Stack Software Developer</span>
          <br />
          <span className="text-3xl">Welcome to my portfolio!</span>
        </h1>
      </span>
    </div>
  );
}
