import { siteUrl } from "@/utils/utils";
import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import Image from "next/image";
import { Octokit } from "octokit";
import React from "react";

export default async function Hero() {
  const octokit = new Octokit();
  const data: GetResponseTypeFromEndpointMethod<
    typeof octokit.rest.users.getAuthenticated
  > = await fetch(`${siteUrl}/api/github?option=profile`).then((res) =>
    res.json(),
  );
  return (
    <section className="mx-auto flex max-w-[25rem] flex-col items-center justify-center gap-4 py-4 text-center font-sans">
      <Image
        src={data?.data?.avatar_url ? data.data.avatar_url : ""}
        alt="Profile Picture from GitHub"
        width={120}
        height={120}
        className="rounded-full"
      />
      <div className="">
        <h1 className="text-xl font-bold">Samet Can Cıncık</h1>
        <p>{data?.data?.bio}</p>
      </div>
    </section>
  );
}
