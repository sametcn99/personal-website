"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Rbweb() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("https://resumebuilderwebapplication.netlify.app");
    }, 3000);
    return () => clearTimeout(redirectTimer);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="">
        <Image
          unoptimized={true}
          src="/redirect.png"
          alt="Picture of the author"
          width={200}
          height={200}
        />
      </div>
      <div className="text-white">Redirecting to Netlify...</div>
      <div className="text-center mt-10">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}
