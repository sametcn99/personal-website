interface Author {
  name: string;
  url: string;
}

interface Language {
  "@type": string;
  name: string;
}

interface Icon {
  src: string;
  sizes: string;
  type: string;
  purpose: string;
}

interface LaunchHandler {
  url: string;
}

interface SiteConfig {
  title: string;
  name: string;
  description: string;
  keywords: string;
  applicationName: string;
  url: URL;
  creator: string;
  authors: Author[];
  type: string;
  image: string;
  locale: string;
  sameAs: string[];
  email: string;
  knowsLanguage: Language[];
  width: string;
  initialScale: number;
  userScalable: boolean;
  short_name: string;
  dir: string;
  categories: string[];
  theme_color: string;
  background_color: string;
  display: string;
  scope: string;
  launch_handler: LaunchHandler;
  start_url: string;
  orientation: string;
  icons: Icon[];
}

export default SiteConfig;
