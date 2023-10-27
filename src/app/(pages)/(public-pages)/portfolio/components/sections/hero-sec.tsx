import Image from "next/image";
import Greeting from "./greeting";

/**
 * Renders the hero section of the portfolio page.
 * @returns JSX element
 */
export default function HeroSec() {
  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen select-none"
      id="hero-sec"
    >
      <Image
        src={"blobanimation.svg"}
        alt="Picture of the author"
        width={500}
        height={500}
        loading="lazy"
        className="flex absolute justify-center items-center scale-50 sm:scale-50 md:scale-75 lg:scale-100"
      />
      <span className="z-10 space-y-7 text-center text-white scale-75 md:scale-90 lg:scale-100">
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
