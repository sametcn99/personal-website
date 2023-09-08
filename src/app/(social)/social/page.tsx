import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import socialLinks from "./links.json";

export const metadata: Metadata = {
  title: "Find Me On The Internet!",
  description: "Generated by create next app",
};

export default function Social() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-lg space-y-3">
        <div className="flex items-center justify-center">
          <Image
            src={"/icon.png"}
            alt="Picture of the author"
            width={150}
            height={150}
          />
        </div>
        <div className="text-center text-sm font-mono font-bold tracking-tight text-black  ">
          you can reach me through these links
        </div>
        <div className="space-y-2 mt-2 pt-5">
          {socialLinks.map((link, index) => (
            <Link legacyBehavior key={index} href={link.href}>
              <a className="block w-full h-full bg-zinc-800 hover:bg-zinc-700 px-28 py-2 rounded-lg text-center text-xl text-white lowercase ">
                {link.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
