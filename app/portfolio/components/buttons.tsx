import { Button } from "@nextui-org/react"; // Import the 'Button' component from the '@nextui-org/react' library.

import { socialMediaLinks } from "@/lib/contact-links"; // Import the 'socialMediaLinks' array from the '@/lib/contact-links' module.

export default function Buttons() {
  return (
    <section className="flex flex-wrap justify-center items-center">
      {/* Define a section element with CSS classes for layout and alignment. */}
      {socialMediaLinks.map(
        (
          socialMedia,
          index // Map over the 'socialMediaLinks' array and create a link for each social media entry.
        ) => (
          <a
            className="m-2" // Apply CSS margin to the link.
            key={index} // Set a unique 'key' for React to identify each link element.
            href={socialMedia.link} // Set the 'href' attribute of the link to the social media URL.
            target="_blank" // Open the link in a new browser tab or window.
            rel="noopener noreferrer" // Specify security attributes for the link.
            aria-label={socialMedia.label} // Provide an accessibility label for screen readers.
          >
            <Button aria-label={socialMedia.label}>{socialMedia.icon}</Button>
            {/* Create a button with an accessibility label and the social media icon. */}
          </a>
        )
      )}
    </section>
  );
}
