"use client";

// Import the Image component from Next.js.
import Image from "next/image";

// Import an array of social links from a local JSON file.
import socialLinks from "./links.json";

// Import components from the Material-UI library.
import { IconButton, Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import { FiShare } from "react-icons/fi";

// Import the motion module from framer-motion library.
import { motion } from "framer-motion";

export default function Social() {
  // Animation container variants
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation item variants
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <section className="flex flex-col items-center space-y-3 p-6">
        {/* Author image */}
        <motion.figure
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex flex-row"
        >
          <Image
            src={"/icon.png"}
            alt="Picture of the author"
            width={120}
            height={120}
            loading="lazy"
          />
        </motion.figure>
        {/* Social links */}
        <motion.ul
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {socialLinks.map((link, index) => (
            <motion.li variants={item} key={index}>
              <a
                className="
              block rounded-lg px-20 md:px-32 py-1
              outline outline-slate-500 outline-offset-1 
              text-center md:text-xl text-white lowercase select-none whitespace-nowrap
              hover:bg-zinc-300 hover:text-black hover:scale-110 
              transition-all duration-300"
                target="_blank"
                href={link.href}
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Contact buttons */}
        <motion.footer
          className="space-x-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* Email button */}
          <Tooltip title="Send me an email!">
            <IconButton
              aria-label="delete"
              size="large"
              className="hover:bg-zinc-700 hover:scale-110"
              onClick={() =>
                (window.location.href = "mailto:sametcn99@gmail.com")
              }
            >
              <EmailIcon color="primary" />
            </IconButton>
          </Tooltip>

          {/* Telegram button */}
          <Tooltip title="Write me a message on Telegram!">
            <IconButton
              aria-label="delete"
              size="large"
              className="hover:bg-zinc-700 hover:scale-110"
              onClick={() => window.open("https://t.me/sametc0", "_blank")}
            >
              <TelegramIcon color="primary" />
            </IconButton>
          </Tooltip>
        </motion.footer>
      </section>
    </main>
  );
}
