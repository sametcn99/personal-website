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
      <span className="mt-4 text-center font-bold text-slate-200 text-2xl select-none uppercase">
        This page is still in development!..
      </span>
    </motion.main>
  );
}
