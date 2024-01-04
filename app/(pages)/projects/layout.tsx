import { Metadata } from "next";
import React from "react";

const meta = {
  title: "Projects | Samet Can Cıncık",
  description: "My Github projects",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
  },
};
export default function layout({ children }: any) {
  return <div>{children}</div>;
}
