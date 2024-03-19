import React from "react";

export default function TechStackItems({ item }: { item: any }) {
  return (
    <div className="m-1 flex w-full flex-row items-center gap-2 rounded-md bg-blue-950 p-2 grayscale filter transition duration-300 ease-in-out hover:bg-[#491f3b] hover:filter-none">
      <div>{item.logo}</div>
      <h2 className="text-lg font-bold">{item.title}</h2>
    </div>
  );
}
