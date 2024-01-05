const commonMetadata = {
  title: "Samet Can Cıncık | sametcc.me",
  description:
    "Web Developer passionate about creating compelling and user-friendly web experiences.",
  keywords:
    "personal website, Next.js, web development, ui design, portfolio, web developer",
  applicationName: "sametcc.me",
  creator: "https://github.com/sametcn99",
  authors: [
    {
      name: "Samet Can Cıncık",
      url: "https://www.sametcc.me/",
    },
  ],
};

export const siteConfig = {
  metadata: {
    ...commonMetadata,
    metadataBase: new URL("https://www.sametcc.me"),
    openGraph: {
      ...commonMetadata,
      type: "website",
      image: "/thumbnail.png",
      locale: "en_US",
    },
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Samet Can Cıncık",
    url: "https://www.sametcc.me/",
    sameAs: [
      "https://www.linkedin.com/in/samet-can-c%C4%B1nc%C4%B1k",
      "http://instagram.com/sametc.0",
      "https://github.com/sametcn99",
      "https://www.youtube.com/channel/UCgXu7EZ76uMqPW8i4ZCL72Q",
    ],
    email: "sametcn99@gmail.com",
    knowsLanguage: [
      {
        "@type": "Language",
        name: "Turkish",
      },
      {
        "@type": "Language",
        name: "English",
      },
    ],
  },
  viewport: {
    themeColor: "black",
    width: "device-width",
    initialScale: 1,
    userScalable: true,
  },
};
