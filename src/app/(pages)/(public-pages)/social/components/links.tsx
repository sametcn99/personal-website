import { sql } from "@vercel/postgres";
import "../../../../styles/globals.css";
import applyDelayedAnimation from "@/app/styles/list-item-delay";


export default async function LinkTable() {
  /**
   * Fetches all social links from the database.
   * @returns {Promise<Object>} A promise that resolves to an object containing the rows of the social_links table.
   */
  const { rows } = await sql`SELECT * from social_links`;
  return (
    <ul className="space-y-4">
      {rows.map((link, index) => (
        <li key={index} style={applyDelayedAnimation(index)}>
          <a
            className="
            list-item-animation 
            block rounded-lg px-20 md:px-32 py-1
            outline outline-slate-500 outline-offset-1 
            text-center md:text-xl text-white lowercase select-none whitespace-nowrap
            hover:bg-zinc-300 hover:text-black hover:scale-110 
            transition-all duration-300"
            target="_blank"
            href={link.href}
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
