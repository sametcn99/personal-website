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
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 space-y-3 rounded-2xl">
        <div className="flex items-center justify-center">
          <Image
            unoptimized={true}
            src={"/icon.png"}
            alt="Picture of the author"
            width={120}
            height={120}
          />
        </div>
        <div className="pb-5 text-center text-xs text-white font-mono font-bold tracking-tight select-none">
          You can reach me through these links
        </div>
        <div className="space-y-2 mt-4">
          {socialLinks.map((link, index) => (
            <Link legacyBehavior key={index} href={link.href}>
              <a
                className="block w-full rounded-lg bg-zinc-800 sm:px-32 md:px-60 py-2 text-center text-white lowercase hover:scale-105 hover:bg-zinc-700 select-none"
                target="_blank"
              >
                {link.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
