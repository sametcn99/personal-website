"use client"; // This appears to be a comment. It doesn't affect the code's functionality but may serve as a reminder or note for the developer.

import React, { useEffect, useState } from "react"; // Import the necessary modules from the 'react' library, including 'useEffect' and 'useState'.

import hello from "@/lib/hello.json"; // Import data from the 'hello.json' file located in the '@/lib' directory and assign it to the 'hello' variable.

import { Tooltip } from "@nextui-org/react"; // Import the 'Tooltip' component from the '@nextui-org/react' library.

export default function Greeting() {
  const [greeting, setGreeting] = useState("Hello World"); // Initialize a state variable 'greeting' with the initial value "Hello World" and a function 'setGreeting' to update it.

  const [greetingLanguage, setGreetingLanguage] = useState("English"); // Initialize a state variable 'greetingLanguage' with the initial value "English" and a function 'setGreetingLanguage' to update it.

  const greetingsArray = Object.values(hello.greetings); // Create an array 'greetingsArray' by extracting the values from the 'greetings' property of the 'hello' object.

  const greetingLanguageArray = Object.keys(hello.greetings); // Create an array 'greetingLanguageArray' by extracting the keys from the 'greetings' property of the 'hello' object.

  const [hovering, setHovering] = useState(false); // Initialize a state variable 'hovering' with the initial value 'false' and a function 'setHovering' to update it.

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hovering) {
        // Check if not hovering over the component.
        const randomIndex = Math.floor(Math.random() * greetingsArray.length); // Generate a random index within the range of 'greetingsArray'.
        const randomGreeting = greetingsArray[randomIndex]; // Retrieve a random greeting from 'greetingsArray'.
        const randomGreetingLanguage = greetingLanguageArray[randomIndex]; // Retrieve the corresponding language for the random greeting.
        setGreetingLanguage(randomGreetingLanguage); // Update the 'greetingLanguage' state with the selected language.
        setGreeting(randomGreeting); // Update the 'greeting' state with the selected greeting.
      }
    }, 800); // Execute the interval function every 800 milliseconds.

    return () => clearInterval(interval); // Clean up the interval when the component unmounts.
  }, [greetingLanguageArray, greetingsArray, hovering]); // Dependencies array to control when the effect should re-run.

  return (
    <h1
      className="flex sticky z-10 justify-center items-center text-5xl font-bold text-center select-none w-[20rem] h-[10rem] break-words"
      onMouseEnter={() => setHovering(true)} // Set 'hovering' to 'true' when the mouse enters the component.
      onMouseLeave={() => setHovering(false)} // Set 'hovering' to 'false' when the mouse leaves the component.
    >
      <Tooltip
        content={greetingLanguage} // Display the 'greetingLanguage' in the tooltip content.
        delay={0}
        closeDelay={0}
        color={"primary"} // Set the tooltip color to "primary".
        showArrow={true} // Show an arrow in the tooltip.
        isOpen={hovering} // Control the tooltip's visibility based on the 'hovering' state.
      >
        <span>{greeting}</span>
        {/* // Display the 'greeting' text within a 'span' element.*/}
      </Tooltip>
    </h1>
  );
}
