import Description from "@mui/icons-material/Description";
import GitHub from "@mui/icons-material/GitHub";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import MailOutline from "@mui/icons-material/MailOutline";
import Telegram from "@mui/icons-material/Telegram";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WhatsApp from "@mui/icons-material/WhatsApp";
import YouTube from "@mui/icons-material/YouTube";
import Box from "@mui/material/Box";
import { FaXTwitter } from "react-icons/fa6";
import {
  SiBluesky,
  SiDiscord,
  SiGoodreads,
  SiImdb,
  SiLeetcode,
  SiLetterboxd,
  SiMastodon,
  SiNpm,
  SiPinterest,
  SiSpotify,
  SiSteam,
  SiYoutubemusic,
} from "react-icons/si";
import { VscExtensions } from "react-icons/vsc";

/**
 * Creates a favicon-based icon element for social links.
 */
function createFaviconIcon(url: string, label: string) {
  return (
    <Box
      component="img"
      src={url}
      alt={`${label} icon`}
      sx={{
        width: 24,
        height: 24,
        display: "block",
        borderRadius: 0.5,
      }}
    />
  );
}

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
    type: ["repo", "repos", "repositories"],
    link: "/repo",
    label: "Repositories",
    visible: true,
    external: false,
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
    visible: false,
    external: true,
    category: "Development Platforms",
    icon: <VscExtensions />,
  },
  {
    type: ["npm", "npmjs"],
    link: new URL("https://www.npmjs.com/~sametc0"),
    label: "NPMJS",
    visible: false,
    external: true,
    category: "Development Platforms",
    icon: <SiNpm />,
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
    icon: <FaXTwitter />,
  },
  {
    type: ["statsfm", "sfm"],
    link: new URL("https://stats.fm/sametc001"),
    label: "Stats.fm",
    visible: false,
    external: true,
    category: "Social Media",
    icon: createFaviconIcon("https://stats.fm/icons/favicon.ico", "Stats.fm"),
  },
  {
    type: ["leetcode", "lc"],
    link: new URL("https://leetcode.com/sametcn99"),
    label: "LeetCode",
    visible: false,
    external: true,
    category: "Development Platforms",
    icon: <SiLeetcode />,
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
    icon: <SiDiscord />,
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
    type: ["readme", "about"],
    link: "/readme",
    label: "Readme",
    visible: true,
    external: false,
    category: "Development Platforms",
    icon: <Description />,
  },
  {
    type: ["support", "sponsor", "donate"],
    link: "/support",
    label: "Support Me",
    visible: true,
    external: false,
    category: "Contact",
    icon: <VolunteerActivismIcon />,
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
    type: ["youtube", "yt"],
    link: new URL("https://youtube.com/@sametc001"),
    label: "YouTube",
    visible: false,
    category: "Social Media",
    external: true,
    icon: <YouTube />,
  },
  {
    type: ["youtubemusic", "ytmusic", "ytm"],
    link: new URL(
      "https://music.youtube.com/channel/UCgXu7EZ76uMqPW8i4ZCL72Q?si=1aNE6Zya_1t9ACFl",
    ),
    label: "YouTubeMusic",
    visible: false,
    external: true,
    category: "Social Media",
    icon: <SiYoutubemusic />,
  },
  {
    type: ["spotify", "sp"],
    label: "Spotify",
    visible: false,
    external: true,
    link: new URL("https://open.spotify.com/user/31qg3kutxxwdq5lzydjx6md534cq"),
    category: "Social Media",
    icon: <SiSpotify />,
  },
  {
    type: ["letterboxd", "lbxd", "lb"],
    label: "Letterboxd",
    visible: false,
    external: true,
    link: new URL("https://letterboxd.com/sametc001"),
    category: "Social Media",
    icon: <SiLetterboxd />,
  },
  {
    type: ["imdb"],
    label: "IMDb",
    visible: false,
    external: true,
    link: new URL("https://www.imdb.com/user/ur120575296"),
    category: "Social Media",
    icon: <SiImdb />,
  },
  {
    type: ["pinterest"],
    label: "Pinterest",
    visible: false,
    external: true,
    link: new URL("https://pinterest.com/sametcn99"),
    category: "Social Media",
    icon: <SiPinterest />,
  },
  {
    type: ["mastodon"],
    label: "Mastodon",
    visible: false,
    external: true,
    link: new URL("https://mastodon.social/@sametcn99"),
    category: "Social Media",
    icon: <SiMastodon />,
  },
  {
    type: ["bluesky", "bsky"],
    label: "Bluesky",
    visible: false,
    external: true,
    link: new URL("https://bsky.app/profile/sametcn99.bsky.social"),
    category: "Social Media",
    icon: <SiBluesky />,
  },
  {
    type: ["goodreads", "gr"],
    label: "Goodreads",
    visible: false,
    external: true,
    link: new URL("https://www.goodreads.com/user/show/75848289-samet"),
    category: "Social Media",
    icon: <SiGoodreads />,
  },
  {
    type: ["backloggd"],
    label: "Backloggd",
    visible: false,
    external: true,
    link: new URL("https://backloggd.com/u/sametc001"),
    category: "Social Media",
    icon: createFaviconIcon("https://backloggd.com/favicon.ico", "Backloggd"),
  },
  {
    type: ["steam"],
    label: "Steam",
    visible: false,
    external: true,
    link: new URL("https://steamcommunity.com/id/sametc001"),
    category: "Social Media",
    icon: <SiSteam />,
  },
];

export const categoryOrder: Record<SocialMediaLink["category"], number> = {
  "Professional Networks": 1,
  "Development Platforms": 2,
  Contact: 3,
  "Social Media": 4,
  Other: 5,
};
