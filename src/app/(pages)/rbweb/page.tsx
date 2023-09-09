"use client"; // This comment appears to have no impact on the code and can be ignored.

import Image from "next/image"; // Import the Image component from the Next.js framework.
import { useEffect } from "react"; // Import the useEffect hook from React.
import { useRouter } from "next/navigation"; // Import the useRouter hook from Next.js for routing.

export default function Rbweb() { // Define a default export function named Rbweb.
  const router = useRouter(); // Initialize the router object using the useRouter hook from Next.js.

  useEffect(() => { // Use the useEffect hook to perform actions after the component has rendered.
    const redirectTimer = setTimeout(() => { // Create a timer using setTimeout to delay the redirection.
      router.push("https://resumebuilderwebapplication.netlify.app"); // Redirect to the specified URL after 3000 milliseconds (3 seconds).
    }, 3000);

    // Cleanup function to clear the timer when the component unmounts.
    return () => clearTimeout(redirectTimer);
  }, []); // The empty dependency array [] ensures this effect runs only once after initial render.

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Create a container div with minimum height to center content vertically */}
      <div className="">
        <Image
          unoptimized={true}
          src="/redirect.png"
          alt="Picture of the author"
          width={200}
          height={200}
        />
        {/* Display an image with specified dimensions */}
      </div>
      <div className="text-white">Redirecting to Netlify...</div>
      {/* Display a text message */}
      <div className="text-center mt-10">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        {/* Display a spinning loading indicator */}
      </div>
    </div>
  );
}
