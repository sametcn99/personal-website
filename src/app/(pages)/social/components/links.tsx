import { sql } from "@vercel/postgres";

export default async function LinkTable() {
  const { rows } = await sql`SELECT * from social_links`;
  return (
    <ul className="space-y-4">
      {rows.map((link, index) => (
        <li key={index}>
          <a
            className="
            block rounded-lg px-20 md:px-32 py-1
            outline outline-slate-500 outline-offset-1 
            text-center md:text-xl text-white lowercase select-none whitespace-nowrap
            hover:bg-zinc-300 hover:text-black hover:scale-110 
            transition-all duration-300"
            target="_blank"
            href={link.href}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
