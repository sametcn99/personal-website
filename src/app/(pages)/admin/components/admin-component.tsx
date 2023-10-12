import { sql } from "@vercel/postgres";

/**
 * Renders the AdminComponent which fetches social links from the database and displays them in a list.
 * @returns {JSX.Element} The rendered AdminComponent.
 */

export default async function AdminComponent() {
  const { rows } = await sql`SELECT * from social_links`;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center mt-12">
        {rows.map((row: any) => (
          <div className="border p-4 m-4 text-center bg-gray-200" key={row.id}>
            <p className="font-semibold">ID: {row.id}</p>
            <p>Name: {row.name}</p>
            <p>Href: {row.href}</p>
          </div>
        ))}
        <h1 className="text-2xl text-white">{JSON.stringify(rows)}</h1>
      </div>
    </div>
  );
}
