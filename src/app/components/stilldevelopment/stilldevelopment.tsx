"use client"; // This comment appears to have no impact on the code and can be ignored.

import Image from "next/image"; // Import the Image component from Next.js.
import React, { useState } from "react"; // Import React and the useState hook.

import TicTacToe from "../game/TicTacToe"; // Import the TicTacToe component from a relative path.

export default function StillDevelopment() { // Define a default export function named StillDevelopment.
  const [showImage, setShowImage] = useState(true); // Create a state variable 'showImage' and a function 'setShowImage' to manage its value. Initialize 'showImage' as 'true'.
  const [showGif, setShowGif] = useState(true); // Create a state variable 'showGif' and a function 'setShowGif' to manage its value. Initialize 'showGif' as 'true'.

  const handleImageClick = () => { // Define a function 'handleImageClick'.
    setShowImage(false); // Set 'showImage' to 'false' when this function is called.
  };

  const handleGifLoad = () => { // Define a function 'handleGifLoad'.
    setShowGif(true); // Set 'showGif' to 'true'.
    setTimeout(() => {
      setShowGif(false); // After 3000 milliseconds (3 seconds), set 'showGif' back to 'false'.
    }, 3000);
  };

  return (
    <div className="text-3xl text-white h-screen flex flex-col items-center justify-center">
      {/* Create a container div with text styling and center the content vertically and horizontally */}
      {showImage ? ( // Conditional rendering based on the 'showImage' state.
        <div onClick={handleImageClick}>
          {/* If 'showImage' is true, display the following content */}
          <div className="relative group">
            {/* Create a div with relative positioning */}
            <Image
              unoptimized={true}
              src={"/development.png"}
              alt="Picture of the author"
              width={300}
              height={300}
              className="rounded-3xl transition-transform transform scale-100 group-hover:scale-105"
            />
            {/* Display an image with specified dimensions and styling */}
          </div>
          <div className="mt-4 font-mono text-white text-sm hover:scale-105 text-center select-none">
            {/* Display a message */}
            This page is still in development!...
          </div>
        </div>
      ) : ( // If 'showImage' is false, display the following content
        <div>
          {showGif ? ( // Conditional rendering based on the 'showGif' state.
            <div>
              {/* If 'showGif' is true, display the following content */}
              <Image
                unoptimized={true}
                src={"/game.gif"}
                alt="Game Gif"
                width={300}
                height={300}
                className="rounded-3xl transition-transform transform scale-100 group-hover:scale-105"
                onLoad={handleGifLoad}
              />
            </div>
          ) : ( // If 'showGif' is false, display the TicTacToe component
            <TicTacToe />
          )}
        </div>
      )}
      <div></div>
    </div>
  );
}
