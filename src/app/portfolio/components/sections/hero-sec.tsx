import Image from "next/image";
import Greeting from "../greeting/greeting";
import { IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";

/**
 * Renders the hero section of the portfolio page.
 * @returns JSX element
 */
export default function HeroSec() {
  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen select-none"
      id="hero-sec"
    >
      <Image
        src={"blobanimation.svg"}
        alt="Picture of the author"
        width={500}
        height={500}
        loading="lazy"
        className="flex absolute justify-center items-center"
      />
      <section className="z-10 space-y-7 text-center">
        <Greeting />
        <section>
          <a href="mailto:sametcn99@gmail.com">
            <IconButton
              aria-label="delete"
              size="large"
              className="hover:scale-110 hover:bg-zinc-700"
            >
              <EmailIcon color="primary" />
            </IconButton>
          </a>
          <a
            href="https://www.linkedin.com/in/samet-can-c%C4%B1nc%C4%B1k/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              aria-label="delete"
              size="large"
              className="hover:scale-110 hover:bg-zinc-700"
            >
              <LinkedInIcon color="primary" />
            </IconButton>
          </a>
          <a
            href="https://github.com/sametcn99"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              aria-label="delete"
              size="large"
              className="hover:scale-110 hover:bg-zinc-700"
            >
              <GitHubIcon color="primary" />
            </IconButton>
          </a>
          <a
            href="https://t.me/sametc0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton
              aria-label="delete"
              size="large"
              className="hover:scale-110 hover:bg-zinc-700"
            >
              <TelegramIcon color="primary" />
            </IconButton>
          </a>
        </section>
      </section>
    </div>
  );
}
