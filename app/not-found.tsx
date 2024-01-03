import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-2xl font-thin">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="font-normal">
        Return Home
      </Link>
    </div>
  );
}
