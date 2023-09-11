"use client"; // This comment appears to have no impact on the code and can be ignored.

import Image from "next/image"; // Import the Image component from Next.js.
import React, { useState, useRef } from "react"; // Import React and the useState hook.
import { Tooltip } from "@mui/material";
import TicTacToe from "../game/TicTacToe"; // Import the TicTacToe component from a relative path.

export default function StillDevelopment() {
  // Define a default export function named StillDevelopment.
  const [showImage, setShowImage] = useState(true); // Create a state variable 'showImage' and a function 'setShowImage' to manage its value. Initialize 'showImage' as 'true'.

  return (
    <div className="text-3xl text-white h-screen flex flex-col items-center justify-center">
      {/* Create a container div with text styling and center the content vertically and horizontally */}
      {showImage ? ( // Conditional rendering based on the 'showImage' state.
        <Tooltip title="Click to Image!">
          <div onClick={() => setShowImage(false)}>
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
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                onSelect={(e) => e.preventDefault()}
              />
              {/* Display an image with specified dimensions and styling */}
            </div>
            <div className="mt-4 font-mono text-white text-sm hover:scale-105 text-center select-none">
              {/* Display a message */}
              This page is still in development!...
            </div>
          </div>
        </Tooltip>
      ) : (
        // If 'showImage' is false, display the following content
        <div>
          <TicTacToe />
        </div>
      )}
    </div>
  );
}
