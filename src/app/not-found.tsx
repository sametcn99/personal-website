import Link from "next/link";

// Define the NotFound component, which will be displayed for 404 (not found) pages.
export default function NotFound() {
  return (
    <div className="text-white h-screen flex items-center justify-center select-none">
      I cannot find the page you are looking for :/
    </div>
  );
}
