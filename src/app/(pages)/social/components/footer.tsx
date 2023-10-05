import { IconButton, Tooltip } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";

export default function FooterComponent() {
  return (
    <footer className="space-x-3">
      {/* Email button */}
      <Tooltip title="Send me an email!">
        <a href="mailto:sametcn99@gmail.com">
          <IconButton
            aria-label="delete"
            size="large"
            className="hover:bg-zinc-700 hover:scale-110"
          >
            <EmailIcon color="primary" />
          </IconButton>
        </a>
      </Tooltip>

      {/* Telegram button */}
      <Tooltip title="Write me a message on Telegram!">
        <a
          href="https://t.me/sametc0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            aria-label="delete"
            size="large"
            className="hover:bg-zinc-700 hover:scale-110"
          >
            <TelegramIcon color="primary" />
          </IconButton>
        </a>
      </Tooltip>
    </footer>
  );
}
