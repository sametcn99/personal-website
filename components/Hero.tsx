import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Octokit } from "octokit";
import { SVGs } from "./PulseBeam";

export default async function Hero() {
  const octokit = new Octokit();
  const datares = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/github?option=profile`,
  );
  const data = (await datares.json()) as GetResponseTypeFromEndpointMethod<
    typeof octokit.rest.users.getAuthenticated
  >;

  if (!data) notFound();

  return (
    <section className="pointer-events-none  mx-auto flex select-none flex-col items-center justify-center gap-4 py-4 text-center font-sans">
      <Image
        src={data.data.avatar_url ? data.data.avatar_url : ""}
        alt="Profile Picture from GitHub"
        width={120}
        height={120}
        className="rounded-full"
      />
      <div className="absolute z--10 flex items-center justify-center ">
        <SVGs />
      </div>
      <p>{data.data.bio}</p>
    </section>
  );
}
