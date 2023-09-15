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
    <div className="min-h-screen flex items-center justify-center">
      {/* Create a container div with minimum height to center content vertically */}
      <div className="rounded-2xl">
        {/* Create a container div with padding and spacing */}
        <div className="flex items-center justify-center">
          {/* Create a div to center content horizontally */}
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
          {/* Display an image with specified dimensions */}
        </div>
        {/* Display a text message */}
        <div className="space-y-2 mt-4">
          {/* Create a container for social links */}
          {socialLinks.map((link, index) => (
            // Map through the socialLinks array and create a Link for each link.
            <Link
              className="block rounded-lg bg-zinc-800 px-36 py-2 text-center text-white lowercase hover:scale-105 hover:bg-zinc-700 select-none"
              key={index}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-center scale-110 mt-3">
          <Tooltip title="Send me an email!">
            <IconButton
              aria-label="delete"
              size="large"
              className="hover:bg-zinc-700 "
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
              className="hover:bg-zinc-700 "
              onClick={() =>
                (window.location.href = "mailto:sametcn99@gmail.com")
              }
            >
              <TelegramIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
