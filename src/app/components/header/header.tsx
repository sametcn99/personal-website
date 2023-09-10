"use client"; // This comment appears to have no impact on the code and can be ignored.

import Image from "next/image"; // Import the Image component from the Next.js framework.
import Link from "next/link"; // Import the Link component from Next.js.
import { useState } from "react"; // Import the useState hook from React.

export const Header = () => {
  // Define a functional component named Header.
  const [active, setActive] = useState(false); // Create a state variable 'active' and a function 'setActive' to manage its value. Initialize 'active' as 'false'.

  const handleClick = () => {
    // Define a function 'handleClick'.
    setActive(!active); // Toggle the value of 'active' when this function is called.
  };

  const navLinks = [
    // Create an array 'navLinks' containing navigation links as objects.
    { label: "Home", href: "/" },
    { label: "Social Links", href: "/social" },
    { label: "Projects", href: "/projectspg" },
    { label: "Contact", href: "/contact" },
  ];

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
        {/* Create a navigation bar with various styling classes. */}
        <Link legacyBehavior href="/">
          <a className="inline-flex items-center p-2 mr-4 select-none">
            <Image
              unoptimized={true}
              src={"/hello-icon.png"}
              alt="Game Gif"
              width={30}
              height={30}
              className="rounded-3xl transition-transform transform scale-100 group-hover:scale-105"
            />
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8..." />
            {/* The above code appears to be SVG path data for an icon. */}
            <span className="text-xl text-white font-bold uppercase tracking-wide ml-3">
              Hello World!
            </span>
          </a>
        </Link>
        <button
          className="inline-flex p-3 hover:bg-zinc-700 rounded lg:hidden text-white ml-auto hover:text-white outline-none"
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
                <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-zinc-700 select-none">
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
