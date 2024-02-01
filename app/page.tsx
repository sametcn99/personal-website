import Image from "next/image";
import Greeting from "../components/Greeting";
import Buttons from "../components/Buttons";

export default function Home() {
  return (
    <>
      <Image
        src={"/blobanimation.svg"} // Assuming the image path is correct
        alt="Picture of the author"
        width={600}
        height={600}
        priority
        loading="eager"
        className={`fixed z--10 flex select-none items-center justify-center`}
      />
      <Greeting />
      <p className="z-0 text-sm font-extralight">
        I&apos;m a Web Developer from Turkey
      </p>
      <Buttons />
    </>
  );
}
