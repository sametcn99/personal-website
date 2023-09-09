// Import the Image component from the Next.js library.
import Image from "next/image";

// Define the NotFound component, which will be displayed for 404 (not found) pages.
export default function NotFound() {
  return (
    // Create a container div with styling for text and alignment.
    <div className="text-3xl text-white h-screen flex flex-col items-center justify-center">
      {/* Create a div for the image, allowing for transformations on hover. */}
      <div className="relative group">
        {/* Use the Image component to display an image with specific properties. */}
        <Image
          unoptimized={true} // Disable image optimization for faster development.
          src={"/404icon.png"} // Set the image source.
          alt="Picture of the author" // Set an alt text for accessibility.
          width={200} // Set the width of the image.
          height={200} // Set the height of the image.
          className="rounded-3xl transition-transform transform scale-100 group-hover:scale-105" // Apply CSS classes for styling and hover effect.
        />
      </div>
      {/* Create a text element for a message and apply styles for hover effect. */}
      <div className="mt-4 font-mono text-lg text-white hover:scale-105 text-center select-none">
        I cannot find the page you are looking for :/
      </div>
    </div>
  );
}
