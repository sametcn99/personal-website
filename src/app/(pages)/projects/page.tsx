import React from "react";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import { sql } from "@vercel/postgres";

// CSS classes
const mainClass =
  "min-h-screen flex flex-col pt-24 items-center justify-center select-none space-y-4 md:flex-row md:space-x-16 md:space-y-0 flex-wrap";
const buttonClass =
  "w-60 h-60 bg-slate-900  text-white flex m-4 flex-col items-center justify-center text-xl font-bold uppercase text-center rounded-lg md:w-60 md:h-60 hover:bg-slate-800 hover:text-white transition duration-300 ease-in-out transform hover:scale-105";
const spanClass = "text-xs m-5 font-normal";
const headerClass = "text-3xl font-bold text-white mb-8 ";
const categoryContainerClass = "flex flex-col items-center space-y-8  ";

/**
 * Renders the ProjectsPage component.
 */
export default async function ProjectsPage() {
  // Filters the project items based on the 'continue' property
  const { rows } = await sql`SELECT * from projects`;
  const continueTrueItems = rows.filter((item) => item.continue);
  const continueFalseItems = rows.filter((item) => !item.continue);

  return (
    <main className={mainClass}>
      <div className={categoryContainerClass}>
        <span className={headerClass}>Continuing Projects</span>
        <div className="flex flex-wrap justify-center">
          {continueTrueItems.map((item, index) => (
            <Tooltip title={item.tooltip} key={index}>
              {item.href.startsWith("http") ? (
                // Renders an <a> tag if the href starts with 'http'
                <a href={item.href} target="_blank" className={buttonClass}>
                  {item.title}
                  <span className={spanClass}>{item.description}</span>
                </a>
              ) : (
                // Renders a Next.js <Link> component if the href does not start with 'http'
                <Link href={item.href} className={buttonClass}>
                  {item.title}
                  <span className={spanClass}>{item.description}</span>
                </Link>
              )}
            </Tooltip>
          ))}
        </div>
      </div>
      <div className={categoryContainerClass}>
        <span className={headerClass}>Finished Projects</span>
        <div className="flex flex-wrap justify-center">
          {continueFalseItems.map((item, index) => (
            <Tooltip title={item.tooltip} key={index}>
              {item.href.startsWith("http") ? (
                // Renders an <a> tag if the href starts with 'http'
                <a href={item.href} target="_blank" className={buttonClass}>
                  {item.title}
                  <span className={spanClass}>{item.description}</span>
                </a>
              ) : (
                // Renders a Next.js <Link> component if the href does not start with 'http'
                <Link href={item.href} className={buttonClass}>
                  {item.title}
                  <span className={spanClass}>{item.description}</span>
                </Link>
              )}
            </Tooltip>
          ))}
        </div>
      </div>
    </main>
  );
}
