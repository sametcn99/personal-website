"use client";
import Link from "next/link"; // Import the Link component from the Next.js framework.
import Image from "next/image"; // Import the Image component from Next.js.
import socialLinks from "./links.json"; // Import an array of social links from a local JSON file.
import { IconButton, Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";

export default function Social() {
  // Define a default export function named Social.
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center space-y-3">
        <Image
          unoptimized={true}
          src={"/icon.png"}
          alt="Picture of the author"
          width={120}
          height={120}
          onDragStart={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
          onSelect={(e) => e.preventDefault()}
        />
        <ul className="space-y-2">
          {socialLinks.map((link, index) => (
            <li key={index}>
              <a
                className="block rounded-lg bg-zinc-800 px-20 md:px-32 py-1 text-center md:text-xl text-white lowercase hover:scale-105 hover:bg-zinc-700 select-none whitespace-nowrap"
                target="_blank"
                href={link.href}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div>
          <Tooltip title="Send me an email!">
            <IconButton
              aria-label="delete"
              size="large"
              className="hover:bg-zinc-700"
              onClick={() =>
                (window.location.href = "mailto:sametcn99@gmail.com")
              }
            >
              <EmailIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Write me a message on Telegram!">
            <IconButton
              aria-label="delete"
              size="large"
              className="hover:bg-zinc-700"
              onClick={() => window.open("https://t.me/sametc0", "_blank")}
            >
              <TelegramIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
