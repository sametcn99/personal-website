export const siteConfig = {
  metadata: {
    title: "Personal Website | sametcc.me",
    description:
      "I'm a Web Developer from Turkey. My passion lies in creating compelling and user-friendly web experiences in the digital realm.",
    keywords:
      "personal website, Next.js, web development, ui design, sametcc.me, sametcc, samet can cıncık, portfolio, web developer",
    applicationName: "sametcc.me",
    creator: "https://github.com/sametcn99",
    authors: [
      {
        name: "samet can cıncık",
        url: "https://www.sametcc.me/",
      },
    ],
    metadataBase: new URL("https://www.sametcc.me"),
    openGraph: {
      title: "Personal Website | sametcc.me",
      description:
        "I'm a Web Developer from Turkey. My passion lies in creating compelling and user-friendly web experiences in the digital realm.",
      url: "https://www.sametcc.me/",
      siteName: "sametcc.me",
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
