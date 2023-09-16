"use client"; // This comment appears to have no impact on the code and can be ignored.
import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const initialButtons = [
    { id: 1, text: "Home", href: "/", active: false },
    { id: 2, text: "Social", href: "/social", active: false },
    { id: 3, text: "Projects", href: "/projects", active: false },
    { id: 4, text: "About", href: "/about", active: false },
  ];

  const [buttons, setButtons] = useState(initialButtons);

  const pathname = usePathname();
  // Sayfa değiştikçe düğmeleri güncelle
  console.log(usePathname());

  // Sayfa değiştikçe düğmeleri güncelle
  useEffect(() => {
    setButtons((prevButtons) =>
      prevButtons.map((button) => ({
        ...button,
        active: button.href === pathname,
      }))
    );
  }, [pathname]);

  return (
    <>
      <div
        className="fixed flex items-center justify-center space-x-4 scale-75 sm:scale-100 p-4 w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(0, 0, 0) 0%, rgb(0, 0, 20) 50%, rgb(0, 0, 0) 100%)",
        }}
      >
        {buttons.map((button) => (
          <Link key={button.id} href={button.href}>
            <button
              className={`rounded-full text-white outline p-2 hover:bg-slate-500 ${
                button.active
                  ? "bg-slate-500 text-slate-400 hover:bg-slate-500"
                  : ""
              }`}
            >
              {button.text}
            </button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Header;
