"use client";
import { IconButton, Tooltip } from "@mui/material";
import { BsArrowUpCircleFill } from "react-icons/bs";

export default function TestComponent() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Daha pürüzsüz bir animasyon eklemek için 'smooth' kullanabilirsiniz.
    });
  };
  return (
    <Tooltip
      title="Scroll Up"
      enterDelay={0}
      className="fixed bottom-4 right-4"
    >
      <IconButton
        aria-label="delete"
        size="large"
        sx={{
          color: "white",
        }}
        onClick={scrollToTop}
      >
        <BsArrowUpCircleFill />
      </IconButton>
    </Tooltip>
  );
}
