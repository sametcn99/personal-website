import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import DescriptionIcon from '@mui/icons-material/Description';
export const socialMediaLinks = [
  {
    type: "email",
    link: "mailto:sametcn99@gmail.com",
    icon: <EmailIcon className="fill-white" />,
    label: "email",
  },
  {
    type: "linkedin",
    link: "https://www.linkedin.com/in/samet-can-c%C4%B1nc%C4%B1k/",
    icon: <LinkedInIcon className="fill-white" />,
    label: "LinkedIn",
  },
  {
    type: "github",
    link: "https://github.com/sametcn99",
    icon: <GitHubIcon className="fill-white" />,
    label: "GitHub",
  },
  {
    type: "telegram",
    link: "https://t.me/sametc0",
    icon: <TelegramIcon className="fill-white" />,
    label: "Telegram",
  },
  {
    type: "resume",
    link: "https://docs.google.com/document/d/1lYhA_7M2-g0JzlqlZlDibM_bksowBTuSqkrVF-7moKs/edit?usp=sharing",
    icon: <DescriptionIcon className="fill-white" />,
    label: "Resume",
  },
];
