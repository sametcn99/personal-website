import BarChart from "@mui/icons-material/BarChart";
import DataObject from "@mui/icons-material/DataObject";
import Description from "@mui/icons-material/Description";
import GitHub from "@mui/icons-material/GitHub";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import MailOutline from "@mui/icons-material/MailOutline";
import MusicNote from "@mui/icons-material/MusicNote";
import QuestionMark from "@mui/icons-material/QuestionMark";
import Telegram from "@mui/icons-material/Telegram";
import Theaters from "@mui/icons-material/Theaters";
import WhatsApp from "@mui/icons-material/WhatsApp";
import X from "@mui/icons-material/X";
import YouTube from "@mui/icons-material/YouTube";

export const socialMediaLinks: SocialMediaLink[] = [
  {
    type: ["linkedin", "li"],
    link: new URL("https://www.linkedin.com/in/sametc0"),
    label: "LinkedIn",
    visible: true,
    external: true,
    category: "Professional Networks",
    icon: <LinkedIn />,
  },
  {
    type: ["github", "gh"],
    link: new URL("https://github.com/sametcn99"),
    label: "GitHub",
    visible: true,
    external: true,
    category: "Development Platforms",
    icon: <GitHub />,
  },
  {
    type: [
      "vscode-extensions",
      "vscodeextensions",
      "vsextensions",
      "vsext",
      "vscode",
      "vsce",
    ],
    link: new URL("https://marketplace.visualstudio.com/publishers/sametcn99"),
    label: "VSCode Extensions",
    visible: true,
    external: true,
    category: "Development Platforms",
    icon: <DataObject />,
  },
  {
    type: ["instagram", "ig"],
    link: new URL("https://instagram.com/sametc.0"),
    label: "Instagram",
    visible: false,
    external: true,
    category: "Social Media",
    icon: <Instagram />,
  },
  {
    type: ["twitter", "x", "tw"],
    link: new URL("https://x.com/samet1178062"),
    label: "X/Twitter",
    visible: false,
    external: true,
    category: "Social Media",
    icon: <X />,
  },
  {
    type: ["statsfm", "sfm", "sf"],
    link: new URL("https://stats.fm/sametc001"),
    label: "Stats.fm",
    visible: false,
    external: true,
    category: "Social Media",
    icon: <BarChart />,
  },
  {
    type: ["leetcode", "lc"],
    link: new URL("https://leetcode.com/sametcn99"),
    label: "LeetCode",
    visible: true,
    external: true,
    category: "Development Platforms",
    icon: <DataObject />,
  },
  {
    type: ["telegram", "tg"],
    link: new URL("https://t.me/sametc0"),
    label: "Telegram",
    visible: true,
    external: true,
    category: "Contact",
    icon: <Telegram />,
  },
  {
    type: ["discord", "dc"],
    link: new URL("https://discord.com/users/1120483504535392327"),
    label: "Discord",
    visible: false,
    external: true,
    category: "Social Media",
    icon: <QuestionMark />,
  },
  {
    type: ["mail", "email", "gmail", "e-mail"],
    link: new URL("mailto:sametcn99@gmail.com"),
    label: "Mail",
    visible: true,
    external: false,
    category: "Contact",
    icon: <MailOutline />,
  },
  {
    type: ["cv", "ozgecmis", "letter", "resume"],
    link: "/cv",
    label: "Resume",
    visible: true,
    external: false,
    category: "Professional Networks",
    icon: <Description />,
  },
  {
    type: ["whatsapp", "wp"],
    link: new URL("https://wa.me/+905303790565"),
    label: "WhatsApp",
    category: "Contact",
    visible: false,
    external: true,
    icon: <WhatsApp />,
  },
  {
    type: ["youtube", "yt", "ytb", "ytube", "ytbchannel", "ytchannel"],
    link: new URL("https://youtube.com/@sametc001"),
    label: "YouTube",
    visible: false,
    category: "Social Media",
    external: true,
    icon: <YouTube />,
  },
  {
    type: ["youtubemusic", "ytmusic", "ymusic", "ytm"],
    link: new URL(
      "https://music.youtube.com/channel/UCgXu7EZ76uMqPW8i4ZCL72Q?si=1aNE6Zya_1t9ACFl",
    ),
    label: "YouTubeMusic",
    visible: false,
    external: true,
    category: "Social Media",
    icon: <MusicNote />,
  },
  {
    type: ["spotify", "sp"],
    label: "Spotify",
    visible: false,
    external: true,
    link: new URL("https://open.spotify.com/user/31qg3kutxxwdq5lzydjx6md534cq"),
    category: "Social Media",
    icon: <MusicNote />,
  },
  {
    type: ["letterboxd", "lbxd", "lb"],
    label: "Letterboxd",
    visible: false,
    external: true,
    link: new URL("https://letterboxd.com/sametc001"),
    category: "Social Media",
    icon: <Theaters />,
  },
  {
    type: ["imdb"],
    label: "IMDb",
    visible: false,
    external: true,
    link: new URL("https://www.imdb.com/user/ur120575296"),
    category: "Social Media",
    icon: <Theaters />,
  },
  {
    type: ["pinterest"],
    label: "Pinterest",
    visible: false,
    external: true,
    link: new URL("https://pinterest.com/sametcn99"),
    category: "Social Media",
    icon: <Theaters />,
  },
  {
    type: ["mastodon"],
    label: "Mastodon",
    visible: false,
    external: true,
    link: new URL("https://mastodon.social/@sametcn99"),
    category: "Social Media",
    icon: <QuestionMark />,
  },
  {
    type: ["bluesky", "bluesky", "bsky"],
    label: "Bluesky",
    visible: false,
    external: true,
    link: new URL("https://bsky.app/profile/sametcn99.bsky.social"),
    category: "Social Media",
    icon: <QuestionMark />,
  },
];

export const categoryOrder: Record<SocialMediaLink["category"], number> = {
  "Professional Networks": 1,
  "Development Platforms": 2,
  Contact: 3,
  "Social Media": 4,
  Other: 5,
};
