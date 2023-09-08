import Image from "next/image";

export default function Home() {
  return (
    <div className="text-3xl text-white h-screen flex flex-col items-center justify-center">
      <div className="relative group">
        <Image
          src={"/development.png"}
          alt="Picture of the author"
          width={300}
          height={300}
          className="rounded-3xl transition-transform transform scale-100 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 font-mono text-lg text-white hover:scale-105 text-center">
        This page is still in development!...
      </div>
    </div>
  );
}
