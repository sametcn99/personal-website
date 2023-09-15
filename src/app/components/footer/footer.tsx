import React from "react"; // Import React library.

const Footer = () => {
  // Define a functional component named Footer.
  return (
    <footer
      className="text-center py-1 fixed bottom-0 w-full"
      style={{
        background:
          "radial-gradient(circle, rgb(0, 0, 0) 0%, rgb(0, 0, 20) 50%, rgb(0, 0, 0) 100%)",
      }}
    >
      {/* Create a footer element with center-aligned text, padding, fixed position at the bottom, and full width. */}
      <a
        href="https://github.com/sametcn99/personal-website"
        className="text-blue-500 text-xs font-sans hover:underline select-none"
        target="_blank"
        rel="noopener"
      >
        {/* Create an anchor element with a link to a GitHub repository, styling, and 'target="_blank"' to open the link in a new tab. */}
        Check out the Source Code from GitHub
      </a>
      {/* Display a text link to check out the source code on GitHub. */}
    </footer>
  );
};

export default Footer; // Export the Footer component as the default export of this module.
