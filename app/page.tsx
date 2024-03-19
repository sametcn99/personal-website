import Image from "next/image";
import Buttons from "../components/Buttons";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <section className=" flex min-h-screen flex-col items-center justify-center">
        <Image
          src={"/blobanimation.svg"} // Assuming the image path is correct
          alt="Picture of the author"
          width={600}
          height={600}
          priority
          loading="eager"
          className={`absolute -z-50 flex select-none items-center justify-center`}
        />
        <Hero />
        <Buttons />
      </section>
      {/* <TechStack /> */}
    </>
  );
}
