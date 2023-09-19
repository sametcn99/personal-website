"use client";
import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { source } from "./content/readme";

export default function Home() {
  return <MarkdownPreview className="lg:p-36 pt-32 p-4" source={source} />;
}
