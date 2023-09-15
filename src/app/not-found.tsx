import Link from "next/link";

// Define the NotFound component, which will be displayed for 404 (not found) pages.
export default function NotFound() {
  return (
    <>
      <div className="text-xl text-white h-screen flex flex-col items-center justify-center">
        I cannot find the page you are looking for :/
        <a
          href="/"
          className="bg-gray-900 text-white uppercase select-none rounded-full p-4 mt-4 hover:bg-gray-700 hover:scale-105"
        >
          take me home
        </a>
      </div>
    </>
  );
}
