import Box from "@mui/material/Box";

const DEFAULT_FAVICON_URL = "/globe.svg";

/**
 * Returns a proxied favicon URL or a default icon URL when invalid.
 */
function getProxiedIconUrl(url: string) {
  if (url.startsWith("/")) {
    return url;
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return DEFAULT_FAVICON_URL;
    }

    return `/api/favicon?url=${encodeURIComponent(parsedUrl.toString())}`;
  } catch {
    return DEFAULT_FAVICON_URL;
  }
}

/**
 * Creates a favicon-based icon element for social links.
 */
function createFaviconIcon(url: string, label: string) {
  const iconUrl = getProxiedIconUrl(url);

  return (
    <Box
      component="img"
      src={iconUrl}
      alt=""
      aria-label={`${label} icon`}
      onError={(event) => {
        const target = event.currentTarget;
        if (target.dataset.fallbackApplied === "true") {
          return;
        }

        target.dataset.fallbackApplied = "true";
        target.src = DEFAULT_FAVICON_URL;
      }}
      sx={{
        width: 24,
        height: 24,
        display: "block",
        objectFit: "cover",
        flexShrink: 0,
        borderRadius: 0.5,
      }}
    />
  );
}

/**
 * Builds a standard favicon URL from a site origin.
 */
function buildFaviconUrl(origin: string) {
  return `${origin}/favicon.ico`;
}

export const socialMediaLinks: SocialMediaLink[] = [
  {
    type: ["linkedin", "li"],
    link: new URL("https://www.linkedin.com/in/sametc0"),
    label: "LinkedIn",
    visible: true,
    external: true,
    category: "Professional Networks",
    icon: createFaviconIcon(
      buildFaviconUrl("https://www.linkedin.com"),
      "LinkedIn",
    ),
    iconColor: "#0A66C2",
  },
  {
    type: ["github", "gh"],
    link: new URL("https://github.com/sametcn99"),
    label: "GitHub",
    visible: true,
    external: true,
    category: "Development Platforms",
    icon: createFaviconIcon(buildFaviconUrl("https://github.com"), "GitHub"),
    iconColor: "#181717",
  },
  {
    type: ["repo", "repos", "repositories"],
    link: "/repo",
    label: "Repositories",
    visible: true,
    external: false,
    category: "Development Platforms",
    icon: createFaviconIcon(
      buildFaviconUrl("https://github.com"),
      "Repositories",
    ),
    iconColor: "#181717",
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
    icon: createFaviconIcon(
      buildFaviconUrl("https://marketplace.visualstudio.com"),
      "VSCode Extensions",
    ),
    iconColor: "#007ACC",
  },
  {
    type: ["npm", "npmjs"],
    link: new URL("https://www.npmjs.com/~sametc0"),
    label: "NPMJS",
    visible: false,
    external: true,
    category: "Development Platforms",
    icon: createFaviconIcon(buildFaviconUrl("https://www.npmjs.com"), "NPMJS"),
    iconColor: "#CB3837",
  },
  {
    type: ["instagram", "ig"],
    link: new URL("https://instagram.com/sametc.0"),
    label: "Instagram",
    visible: false,
    external: true,
    category: "Social Media",
    icon: createFaviconIcon(
      buildFaviconUrl("https://www.instagram.com"),
      "Instagram",
    ),
    iconColor: "#E4405F",
  },
  {
    type: ["twitter", "x", "tw"],
    link: new URL("https://x.com/samet1178062"),
    label: "X/Twitter",
    visible: false,
    external: true,
    category: "Social Media",
    icon: createFaviconIcon(buildFaviconUrl("https://x.com"), "X/Twitter"),
    iconColor: "#111827",
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
    icon: createFaviconIcon(
      buildFaviconUrl("https://leetcode.com"),
      "LeetCode",
    ),
    iconColor: "#FFA116",
  },
  {
    type: ["telegram", "tg"],
    link: new URL("https://t.me/sametc0"),
    label: "Telegram",
    visible: true,
    external: true,
    category: "Contact",
    icon: createFaviconIcon(buildFaviconUrl("https://t.me"), "Telegram"),
    iconColor: "#26A5E4",
  },
  {
    type: ["discord", "dc"],
    link: new URL("https://discord.com/users/1120483504535392327"),
    label: "Discord",
    visible: false,
    external: true,
    category: "Social Media",
    icon: createFaviconIcon(buildFaviconUrl("https://discord.com"), "Discord"),
    iconColor: "#5865F2",
  },
  {
    type: ["mail", "email", "gmail", "e-mail"],
    link: new URL("mailto:sametcn99@gmail.com"),
    label: "Mail",
    visible: true,
    external: false,
    category: "Contact",
    icon: createFaviconIcon(buildFaviconUrl("https://mail.google.com"), "Mail"),
    iconColor: "#EA4335",
  },
  {
    type: ["cv", "ozgecmis", "letter", "resume"],
    link: "/cv",
    label: "Resume",
    visible: true,
    external: false,
    category: "Professional Networks",
    icon: createFaviconIcon(buildFaviconUrl("https://sametcc.me"), "Resume"),
    iconColor: "#1A73E8",
  },
  {
    type: ["readme", "about"],
    link: "/readme",
    label: "Readme",
    visible: true,
    external: false,
    category: "Development Platforms",
    icon: createFaviconIcon(buildFaviconUrl("https://sametcc.me"), "Readme"),
    iconColor: "#24292F",
  },
  {
    type: ["support", "sponsor", "donate"],
    link: "/support",
    label: "Support Me",
    visible: true,
    external: false,
    category: "Contact",
    icon: createFaviconIcon(
      buildFaviconUrl("https://sametcc.me"),
      "Support Me",
    ),
    iconColor: "#FFDD00",
  },
  {
    type: ["whatsapp", "wp"],
    link: new URL("https://wa.me/+905303790565"),
    label: "WhatsApp",
    category: "Contact",
    visible: false,
    external: true,
    icon: createFaviconIcon(buildFaviconUrl("https://wa.me"), "WhatsApp"),
    iconColor: "#25D366",
  },
  {
    type: ["youtube", "yt"],
    link: new URL("https://youtube.com/@sametc001"),
    label: "YouTube",
    visible: false,
    category: "Social Media",
    external: true,
    icon: createFaviconIcon(buildFaviconUrl("https://youtube.com"), "YouTube"),
    iconColor: "#FF0000",
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
    icon: createFaviconIcon(
      buildFaviconUrl("https://music.youtube.com"),
      "YouTubeMusic",
    ),
    iconColor: "#FF0000",
  },
  {
    type: ["spotify", "sp"],
    label: "Spotify",
    visible: false,
    external: true,
    link: new URL("https://open.spotify.com/user/31qg3kutxxwdq5lzydjx6md534cq"),
    category: "Social Media",
    icon: createFaviconIcon(
      buildFaviconUrl("https://open.spotify.com"),
      "Spotify",
    ),
    iconColor: "#1DB954",
  },
  {
    type: ["letterboxd", "lbxd", "lb"],
    label: "Letterboxd",
    visible: false,
    external: true,
    link: new URL("https://letterboxd.com/sametc001"),
    category: "Social Media",
    icon: createFaviconIcon(
      buildFaviconUrl("https://letterboxd.com"),
      "Letterboxd",
    ),
    iconColor: "#202830",
  },
  {
    type: ["imdb"],
    label: "IMDb",
    visible: false,
    external: true,
    link: new URL("https://www.imdb.com/user/ur120575296"),
    category: "Social Media",
    icon: createFaviconIcon(buildFaviconUrl("https://www.imdb.com"), "IMDb"),
    iconColor: "#F5C518",
  },
  {
    type: ["pinterest"],
    label: "Pinterest",
    visible: false,
    external: true,
    link: new URL("https://pinterest.com/sametcn99"),
    category: "Social Media",
    icon: createFaviconIcon(
      buildFaviconUrl("https://pinterest.com"),
      "Pinterest",
    ),
    iconColor: "#E60023",
  },
  {
    type: ["mastodon"],
    label: "Mastodon",
    visible: false,
    external: true,
    link: new URL("https://mastodon.social/@sametcn99"),
    category: "Social Media",
    icon: createFaviconIcon(
      buildFaviconUrl("https://mastodon.social"),
      "Mastodon",
    ),
    iconColor: "#6364FF",
  },
  {
    type: ["bluesky", "bsky"],
    label: "Bluesky",
    visible: false,
    external: true,
    link: new URL("https://bsky.app/profile/sametcn99.bsky.social"),
    category: "Social Media",
    icon: createFaviconIcon(buildFaviconUrl("https://bsky.app"), "Bluesky"),
    iconColor: "#0285FF",
  },
  {
    type: ["goodreads", "gr"],
    label: "Goodreads",
    visible: false,
    external: true,
    link: new URL("https://www.goodreads.com/user/show/75848289-samet"),
    category: "Social Media",
    icon: createFaviconIcon(
      buildFaviconUrl("https://www.goodreads.com"),
      "Goodreads",
    ),
    iconColor: "#553B08",
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
    icon: createFaviconIcon(
      buildFaviconUrl("https://steamcommunity.com"),
      "Steam",
    ),
    iconColor: "#171A21",
  },
];

export const categoryOrder: Record<SocialMediaLink["category"], number> = {
  "Professional Networks": 1,
  "Development Platforms": 2,
  Contact: 3,
  "Social Media": 4,
  Other: 5,
};
