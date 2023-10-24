"use client";
import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { BsArrowUpCircleFill } from "react-icons/bs";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });

    // Temizlik işlemi: bileşen sona erdiğinde olay dinleyicisini kaldırın
    return () => {
      window.removeEventListener("scroll", () => {
        // Dinleyiciyi kaldırmak için aynı işlemi burada da yapabilirsiniz.
      });
    };
  }, []); // Boş bağımlılık dizisi, yalnızca bileşen oluşturulduğunda çalışmasını sağlar.

  return (
    <div className={`fixed bottom-4 right-4 ${visible ? "visible" : "hidden"}`}>
      <Tooltip title="Scroll Up" enterDelay={0}>
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
    </div>
  );
}
