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
  type: string[];
};

export const socialMediaLinks: SocialMediaLink[] = [
  {
    type: ["linkedin", "li"],
    link: new URL("https://www.linkedin.com/in/sametc0"),
    icon: <LinkedInIcon className="fill-white" />,
    label: "LinkedIn",
  },
  {
    type: ["github", "gh"],
    link: new URL("https://github.com/sametcn99"),
    icon: <GitHubIcon className="fill-white" />,
    label: "GitHub",
  },
  {
    type: ["leetcode", "lc"],
    link: new URL("https://leetcode.com/sametcn99"),
    icon: <SiLeetcode className="fill-white" size={20} />,
    label: "LeetCode",
  },
  {
    type: ["telegram", "tg"],
    link: new URL("https://t.me/sametc0"),
    icon: <TelegramIcon className="fill-white" />,
    label: "Telegram",
  },
  {
    type: ["whatsapp", "wa", "wp"],
    link: new URL("https://wa.me/905303790565"),
    icon: <FaWhatsapp className="fill-white" size={22} />,
    label: "WhatsApp",
  },
  {
    type: ["mail", "email", "gmail", "mail", "e-mail", "e-mail", "e-mail"],
    link: new URL("mailto:sametcn99@gmail.com"),
    icon: <EmailIcon className="fill-white" />,
    label: "Mail",
  },
  {
    type: ["gpv", "githubprofileviewer", "gitpv"],
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
    type: ["resume", "cv", "ozgecmis", "letter"],
    link: new URL("https://rxresu.me/sametcn99/samet-can-cincik"),
    icon: <DescriptionIcon className="fill-white" />,
    label: "Resume",
  },
];
