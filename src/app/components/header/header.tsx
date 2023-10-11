"use client"; // This comment appears to have no impact on the code and can be ignored.
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { initialButtons } from "./page-links";

const Header = () => {
  // Define state for buttons and a function to update the state
  const [buttons, setButtons] = useState(initialButtons);

  // Get the current pathname using a custom hook
  const pathname = usePathname();

  // Update the buttons based on the current pathname
  useEffect(() => {
    setButtons((prevButtons) =>
      prevButtons.map((button) => ({
        ...button,
        // Set the 'active' property to true if the button's href matches the current pathname
        active: button.href === pathname,
      }))
    );
  }, [pathname]);

  if (pathname === "/portfolio") {
    return null; // Return null to prevent rendering
  }
  return (
    <nav className="fixed flex items-center justify-center space-x-4 scale-75 sm:scale-100 p-4 w-full rounded-full z-10">
      {buttons.map((button) => (
        // Create a Link component for each button
        <Link key={button.id} href={button.href}>
          <button
            // Apply CSS classes based on button state
            className={`rounded-full text-white outline p-2 hover:bg-slate-500 uppercase text-xs ${
              button.active
                ? "bg-slate-500 text-slate-400 hover:bg-slate-500"
                : "bg-black"
            }`}
          >
            {/* Display the button text */}
            {button.text}
          </button>
        </Link>
      ))}
    </nav>
  );
};

export default Header;
