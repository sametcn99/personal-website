"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/app/loading";

type RedirectProps = {
  searchParams: { url: string };
};

export default function Redirect({ searchParams }: RedirectProps) {
  const router = useRouter();
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push(searchParams.url);
    }, 1000);
    return () => clearTimeout(redirectTimeout);
  }, [router, searchParams.url]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-4 text-2xl font-bold">
      <Loading />
      <h1>Redirecting...</h1>
    </section>
  );
}
