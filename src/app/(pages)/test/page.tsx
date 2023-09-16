"use client"; // This comment appears to have no impact on the code and can be ignored.
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Test() {
  const initialButtons = [
    { id: 1, text: "Home", href: "/", active: false },
    { id: 2, text: "Social", href: "/social", active: false },
    { id: 3, text: "Projects", href: "/projects", active: false },
    { id: 4, text: "About", href: "/about", active: false },
  ];
  const router = useRouter();

  const [buttons, setButtons] = useState(initialButtons);
  useEffect(() => {
    // Sayfa değiştikçe düğmeleri güncelle
    const currentButton = buttons.find(
      (button) => button.href === router.asPath
    );
    if (currentButton) {
      toggleActive(currentButton.id);
    }
  }, [router.asPath]);

  const toggleActive = (buttonId: number) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) => ({
        ...button,
        active: button.id === buttonId,
      }))
    );
  };

  return (
    <nav
      className="fixed transform -translate-x-1/2 flex items-center justify-center space-x-2 mt-6 "
      style={{
        background:
          "radial-gradient(circle, rgb(0, 0, 0) 0%, rgb(0, 0, 20) 50%, rgb(0, 0, 0) 100%)",
      }}
    >
      {buttons.map((button) => (
        <Link key={button.id} href={button.href}>
          <Button
            key={button.id}
            variant="outlined"
            className={`rounded-full text-white ${
              button.active ? "bg-slate-500 text-slate-400" : ""
            }`}
            onClick={() => toggleActive(button.id)}
          >
            {button.text}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
