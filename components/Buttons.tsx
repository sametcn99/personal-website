"use client";
import { socialMediaLinks } from "@/lib/contact-links"; // Import the 'socialMediaLinks' array from the '@/lib/contact-links' module.
import { motion } from "framer-motion";

export default function Buttons() {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
        
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.section
      className="flex flex-wrap items-center justify-center gap-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Define a section element with CSS classes for layout and alignment. */}
      {socialMediaLinks.map(
        (
          socialMedia,
          index, // Map over the 'socialMediaLinks' array and create a link for each social media entry.
        ) => (
          <motion.a
            className="m-1 inline-flex select-none gap-2 transition-all duration-700" // Apply CSS margin to the link.
            key={index} // Set a unique 'key' for React to identify each link element.
            href={`/${socialMedia.type[0]}`} // Set the 'href' attribute of the link to the social media URL.
            target="_blank" // Open the link in a new browser tab or window.
            rel="noopener noreferrer" // Specify security attributes for the link.
            aria-label={socialMedia.label} // Provide an accessibility label for screen readers.
            variants={item}
          >
            {socialMedia.icon} {socialMedia.label}
            {/* Create a button with an accessibility label and the social media icon. */}
          </motion.a>
        ),
      )}
    </motion.section>
  );
}
