import { siteConfig } from "./site-config";

const commonMetadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.applicationName,
  creator: siteConfig.creator,
  authors: siteConfig.authors,
};

export const metaData = {
  metadata: {
    ...commonMetadata,
    metadataBase: siteConfig.url,
    openGraph: {
      ...commonMetadata,
      type: siteConfig.type,
      image: siteConfig.image,
      locale: siteConfig.locale,
    },
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: siteConfig.sameAs,
    email: siteConfig.email,
    knowsLanguage: siteConfig.knowsLanguage,
  },
  viewport: {
    themeColor: siteConfig.theme_color,
    width: siteConfig.width,
    initialScale: siteConfig.initialScale,
    userScalable: siteConfig.userScalable,
  },
};
