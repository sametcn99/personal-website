import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { socialMediaLinks } from "@/lib/contact-links";

export default function Buttons() {
  return (
    <section className="flex flex-wrap items-center justify-center">
      {socialMediaLinks.map((socialMedia, index) => (
        <a
          className="m-2"
          key={index}
          href={socialMedia.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialMedia.label}
        >
          <Button aria-label={socialMedia.label}>{socialMedia.icon}</Button>
        </a>
      ))}
    </section>
  );
}
