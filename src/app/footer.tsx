import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="text-center py-1 fixed bottom-0 w-full">
      <div className="mt-40">
        <a
        href="https://github.com/sametcn99/personal-website"
        className="text-blue-500 text-xs font-sans hover:underline select-none"
        target="_blank"
      >
        Check out the Source Code from GitHub
      </a></div>

    </footer>
  );
};

export default Footer;
