import Image from "next/image";

export default function NotFound() {
  return (
    <div className="text-3xl text-white h-screen flex flex-col items-center justify-center">
      <div className="relative group">
        <Image
          unoptimized={true}
          src={"/404icon.png"}
          alt="Picture of the author"
          width={200}
          height={200}
          className="rounded-3xl transition-transform transform scale-100 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 font-mono text-lg text-white hover:scale-105 text-center select-none">
        I cannot find the page you are looking for :/
      </div>
    </div>
  );
}
