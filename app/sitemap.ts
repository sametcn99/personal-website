import { socialMediaLinks } from "@/lib/contact-links";
import { GitHubRepo } from "@/types";
import { siteUrl } from "@/utils/utils";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const social: any = socialMediaLinks; // Update the type based on your actual socialMediaLinks type
  const response = await fetch(
    `${siteUrl}/api/github?username=sametcn99&option=repos`,
    {
      cache: "no-store" && "no-cache",
    },
  );
  const fetchedData = await response.json();
  const repos: GitHubRepo[] = fetchedData.data; // Update the type based on your actual fetchedData type
  return [
    {
      url: "https://www.sametcc.me/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.sametcc.me/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.sametcc.me/gists",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.sametcc.me/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...social.map((link: any) => ({
      url: `${siteUrl}/${link.type}`,
      lastModified: new Date(),
      changeFrequency: "monthly", // Update this based on your desired frequency
      priority: 1,
    })),
    ...repos.map((repo: any) => ({
      url: `${siteUrl}/${repo.name}}`,
      lastModified: new Date(),
      changeFrequency: "monthly", // Update this based on your desired frequency
      priority: 1,
    })),
  ];
}
