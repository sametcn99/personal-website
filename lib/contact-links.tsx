import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import DescriptionIcon from "@mui/icons-material/Description";
import { SiLeetcode } from "react-icons/si";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { ReactElement } from "react";

type SocialMediaLink = {
  link: URL;
  icon: ReactElement;
  label: string;
  type: string;
};

export const socialMediaLinks: SocialMediaLink[] = [
  {
    type: "linkedin",
    link: new URL("https://www.linkedin.com/in/samet-can-c%C4%B1nc%C4%B1k/"),
    icon: <LinkedInIcon className="fill-white" />,
    label: "LinkedIn",
  },
  {
    type: "github",
    link: new URL("https://github.com/sametcn99"),
    icon: <GitHubIcon className="fill-white" />,
    label: "GitHub",
  },
  {
    type: "leetcode",
    link: new URL("https://leetcode.com/sametcn99"),
    icon: <SiLeetcode className="fill-white" size={20} />,
    label: "LeetCode",
  },
  {
    type: "telegram",
    link: new URL("https://t.me/sametc0"),
    icon: <TelegramIcon className="fill-white" />,
    label: "Telegram",
  },
  {
    type: "whatsapp",
    link: new URL("https://wa.me/905303790565"),
    icon: <FaWhatsapp className="fill-white" size={22} />,
    label: "WhatsApp",
  },
  {
    type: "mail",
    link: new URL("mailto:sametcn99@gmail.com"),
    icon: <EmailIcon className="fill-white" />,
    label: "Mail",
  },
  {
    type: "GPV",
    link: new URL("https://githubprofileviewer.com/sametcn99"),
    icon: (
      <Image
        src="https://raw.githubusercontent.com/sametcn99/github-profile-viewer/master/public/icons/icon32.png"
        width={22}
        height={22}
        alt="GPV"
      />
    ),
    label: "GPV",
  },
  {
    type: "resume",
    link: new URL(
      "https://docs.google.com/document/d/1lYhA_7M2-g0JzlqlZlDibM_bksowBTuSqkrVF-7moKs/edit?usp=sharing",
    ),
    icon: <DescriptionIcon className="fill-white" />,
    label: "Resume",
  },
];
