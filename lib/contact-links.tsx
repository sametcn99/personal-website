import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import DescriptionIcon from "@mui/icons-material/Description";
import { SiLeetcode, SiYoutubemusic } from "react-icons/si";
import Image from "next/image";
import { FaDiscord, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { ReactElement } from "react";

type SocialMediaLink = {
  link: URL;
  icon: ReactElement;
  label: string;
  type: string[];
  visible: boolean;
};

export const socialMediaLinks: SocialMediaLink[] = [
  {
    type: ["linkedin", "li"],
    link: new URL("https://www.linkedin.com/in/sametc0"),
    icon: <LinkedInIcon className="fill-white" />,
    label: "LinkedIn",
    visible: true,
  },
  {
    type: ["github", "gh"],
    link: new URL("https://github.com/sametcn99"),
    icon: <GitHubIcon className="fill-white" />,
    label: "GitHub",
    visible: true,
  },
  {
    type: ["gists", "gist", "ghg", "ghgist", "ghgists"],
    link: new URL("https://gist.github.com/sametcn99"),
    icon: <GitHubIcon className="fill-white" />,
    label: "Gists",
    visible: true,
  },
  {
    type: ["codenest", "cn"],
    link: new URL("https://codenest.app/user/92addc02-ac45-466b-baf9-6e71f85d88b7"),
    icon: (
      <Image
        src="https://codenest.app/user/92addc02-ac45-466b-baf9-6e71f85d88b7"
        width={22}
        height={22}
        alt="CodeNest"
      />
    ),
    label: "CodeNest",
    visible: true,
  },
  {
    type: ["leetcode", "lc"],
    link: new URL("https://leetcode.com/sametcn99"),
    icon: <SiLeetcode className="fill-white" size={20} />,
    label: "LeetCode",
    visible: true,
  },
  {
    type: ["telegram", "tg"],
    link: new URL("https://t.me/sametc0"),
    icon: <TelegramIcon className="fill-white" />,
    label: "Telegram",
    visible: true,
  },
  {
    type: ["discord", "dc"],
    link: new URL("https://discord.com/users/1120483504535392327"),
    icon: <FaDiscord className="fill-white" size={22} />,
    label: "Discord",
    visible: true,
  },
  {
    type: ["whatsapp", "wa", "wp"],
    link: new URL("https://wa.me/905303790565"),
    icon: <FaWhatsapp className="fill-white" size={22} />,
    label: "WhatsApp",
    visible: true,
  },
  {
    type: ["mail", "email", "gmail", "e-mail", "gmail"],
    link: new URL("mailto:sametcn99@gmail.com"),
    icon: <EmailIcon className="fill-white" />,
    label: "Mail",
    visible: true,
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
    visible: true,
  },
  {
    type: ["resume", "cv", "ozgecmis", "letter"],
    link: new URL("https://rxresu.me/sametcn99/samet-can-cincik"),
    icon: <DescriptionIcon className="fill-white" />,
    label: "Resume",
    visible: true,
  },
  {
    type: ["youtube", "yt", "ytb", "ytube", "ytbchannel", "ytchannel"],
    link: new URL("https://youtube.com/@sametc001"),
    icon: <FaYoutube className="fill-white" size={22} />,
    label: "YouTube",
    visible: true,
  },
  {
    type: [
      "youtubemusic",
      "ytmusic",
      "ytbmusic",
      "ytmusicchannel",
      "ymusic",
      "ytm",
    ],
    link: new URL(
      "https://music.youtube.com/channel/UCgXu7EZ76uMqPW8i4ZCL72Q?si=1aNE6Zya_1t9ACFl",
    ),
    icon: <SiYoutubemusic className="fill-white" />,
    label: "YouTubeMusic",
    visible: false,
  },
];
