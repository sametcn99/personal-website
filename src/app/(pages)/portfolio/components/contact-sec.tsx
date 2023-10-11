import { IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

export default function ContactSec() {
  return (
    <section className="h-screen flex flex-col justify-center items-center space-y-6">
      <span className=" text-white text-center">
        <h1 className=" md:text-8xl lg:text-9xl text-7xl opacity-10 font-bold select-none">
          Contact
        </h1>
      </span>
      <footer className="scale-150 space-x-4">
        <a href="mailto:sametcn99@gmail.com">
          <IconButton
            aria-label="delete"
            size="large"
            className="hover:bg-zinc-700 hover:scale-110"
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
            className="hover:bg-zinc-700 hover:scale-110"
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
            className="hover:bg-zinc-700 hover:scale-110"
          >
            <GitHubIcon color="primary" />
          </IconButton>
        </a>
      </footer>
    </section>
  );
}
