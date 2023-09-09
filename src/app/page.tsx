"use client";
import Image from "next/image";
import React, { useState } from "react";
import TicTacToe from "./(game)/TicTacToe";

export default function Home() {
  const [showImage, setShowImage] = useState(true);
  const [showGif, setShowGif] = useState(true);

  // Resme tıklandığında resmi ve yazıyı kaldırmak için bir işlev tanımlayın.
  const handleImageClick = () => {
    setShowImage(false);
    setTimeout(() => {
      setShowGif(false);
    }, 3000);
  };

  return (
    <div className="text-3xl text-white h-screen flex flex-col items-center justify-center">
      {showImage ? (
        <div onClick={handleImageClick}>
          <div className="relative group">
            <Image
              src={"/development.png"}
              alt="Picture of the author"
              width={300}
              height={300}
              className="rounded-3xl transition-transform transform scale-100 group-hover:scale-105"
            />
          </div>
          <div className="mt-4 font-mono text-white text-sm hover:scale-105 text-center select-none">
            This page is still in development!...
          </div>
        </div>
      ) : (
        <div>
          {showGif ? (
            <div>
              <Image
                src={"/game.gif"}
                alt="Picture of the author"
                width={300}
                height={300}
                className="rounded-3xl transition-transform transform scale-100 group-hover:scale-105"
              />
            </div>
          ) : (
            <TicTacToe />
          )}
        </div>
      )}
      <div></div>
    </div>
  );
}
