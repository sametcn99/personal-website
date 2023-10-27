import { IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
/**
 * Renders the Contact section of the Portfolio page.
 * @returns JSX.Element
 */
export default function ContactSec() {
  return (
    <div className="flex flex-col justify-center items-center space-y-6 h-screen">
      <span className="text-center text-white">
        <h1 className="text-7xl font-bold opacity-10 select-none md:text-8xl lg:text-9xl">
          Contact
        </h1>
      </span>
      <footer className="space-x-4 scale-150">
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
      </footer>
    </div>
  );
}
