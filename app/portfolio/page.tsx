import Image from "next/image";
import Buttons from "./components/buttons";
import Greeting from "./components/greeting";

export default function Portfolio() {
  return (
    <section className="flex justify-center flex-col items-center h-full space-y-6">
      <Image
        src={"blobanimation.svg"}
        alt="Picture of the author"
        width={500}
        height={500}
        loading="lazy"
        className="flex absolute justify-center items-center "
      />
      <Greeting />
      <Buttons />
    </section>
  );
}
