import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="text-center py-4 fixed bottom-0 w-full">
      <a
        href="https://github.com/sametcn99/personal-website"
        className="text-blue-500 text-xs font-sans hover:underline select-none"
        target="_blank"
      >
        Check out the Source Code from GitHub
      </a>
    </footer>
  );
};

export default Footer;
