"use client";
import Image from "next/image";
import React, { useState } from "react";
import TicTacToe from "./components/game/TicTacToe";
import StillDevelopment from "./components/stilldevelopment/stilldevelopment";

export default function Home() {
  return (
    <div>
      <StillDevelopment />
    </div>
  );
}