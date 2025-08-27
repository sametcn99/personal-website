type SocialMediaLink = {
  link: URL | string;
  label: string;
  type: string[];
  visible: boolean;
  category:
    | "Professional Networks"
    | "Development Platforms"
    | "Social Media"
    | "Contact"
    | "Other";
  icon?: React.ReactNode; // Add optional icon property
  external?: boolean; // Add optional external property
};
