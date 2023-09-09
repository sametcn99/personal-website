import React from "react"; // Import React library.
import Image from "next/image"; // Import the Image component from Next.js.

const Footer = () => { // Define a functional component named Footer.
  return (
    <footer className="text-center py-1 fixed bottom-0 w-full">
      {/* Create a footer element with center-aligned text, padding, fixed position at the bottom, and full width. */}
      <div className="mt-40">
        {/* Create a div element with top margin. */}
        <a
          href="https://github.com/sametcn99/personal-website"
          className="text-blue-500 text-xs font-sans hover:underline select-none"
          target="_blank"
        >
          {/* Create an anchor element with a link to a GitHub repository, styling, and 'target="_blank"' to open the link in a new tab. */}
          Check out the Source Code from GitHub
        </a>
        {/* Display a text link to check out the source code on GitHub. */}
      </div>
    </footer>
  );
};

export default Footer; // Export the Footer component as the default export of this module.
