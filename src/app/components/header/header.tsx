"use client"; // This comment appears to have no impact on the code and can be ignored.

import Image from "next/image"; // Import the Image component from the Next.js framework.
import Link from "next/link"; // Import the Link component from Next.js.
import { useState } from "react"; // Import the useState hook from React.
import { navLinks } from "./page-links";

export const Header = () => {
  // Define a functional component named Header.
  const [active, setActive] = useState(false); // Create a state variable 'active' and a function 'setActive' to manage its value. Initialize 'active' as 'false'.

  const handleClick = () => {
    // Define a function 'handleClick'.
    setActive(!active); // Toggle the value of 'active' when this function is called.
  };

  return (
    <>
      {/* This is a shorthand for a React Fragment, which allows you to return multiple elements without a wrapping div. */}
      <nav
        className="fixed top-0 left-0 right-0 z-10 flex items-center flex-wrap p-3"
        style={{
          background:
            "radial-gradient(circle, rgb(0, 0, 0) 0%, rgb(0, 0, 20) 50%, rgb(0, 0, 0) 100%)",
        }}
      >

        <button
          className="inline-flex p-3  rounded lg:hidden text-white ml-auto"
          onClick={handleClick}
        >
          {/* Create a button with a click event handler 'handleClick'. */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* The above SVG code represents a hamburger menu icon. */}
        {/* Note that in this div we will use a ternary operator to decide whether or not to display the content of the div */}
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          {/* Conditional rendering of content based on the 'active' state. */}
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            {/* Create a div for navigation links */}
            {navLinks.map((link, index) => (
              <Link legacyBehavior key={index} href={link.href}>
                <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-slate-600 select-none">
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
