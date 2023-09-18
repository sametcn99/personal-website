"use client"; // This comment appears to have no impact on the code and can be ignored.
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  // Define an array of initial buttons
  const initialButtons = [
    { id: 1, text: "Home", href: "/", active: false },
    { id: 2, text: "Social", href: "/social", active: false },
    { id: 3, text: "Projects", href: "/projects", active: false },
    { id: 4, text: "About", href: "/about", active: false },
  ];

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

  return (
    <nav
      className="fixed flex items-center justify-center space-x-4 scale-75 sm:scale-100 p-4 w-full rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgb(0, 0, 0) 0%, rgb(0, 0, 20) 50%, rgb(0, 0, 0) 100%)",
      }}
    >
      {buttons.map((button) => (
        // Create a Link component for each button
        <Link key={button.id} href={button.href}>
          <button
            // Apply CSS classes based on button state
            className={`rounded-full text-white outline p-2 hover:bg-slate-500 ${
              button.active
                ? "bg-slate-500 text-slate-400 hover:bg-slate-500"
                : ""
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
