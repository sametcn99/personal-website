"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function StillDevelopment() {
  return (
    <motion.main
      className="flex flex-col items-center justify-center h-screen text-3xl text-white"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
    >
      <figure>
        <Image
          unoptimized={true}
          src={"/development.png"}
          alt="Picture of the author"
          width={300}
          height={300}
          className="rounded-3xl transition-transform transform scale-100"
        />
      </figure>
      <figcaption className="mt-4 text-center font-mono text-white text-sm select-none">
        This page is still in development!...
      </figcaption>
    </motion.main>
  );
}
