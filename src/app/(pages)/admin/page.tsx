"use client";

import { QueryResultRow, sql } from "@vercel/postgres";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [rows, setRows] = useState<QueryResultRow[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { rows } = await sql`SELECT * from social_links`;
        setRows(rows); // Verileri rows state'ine atıyoruz
      } catch (error) {
        console.error("Verileri alırken bir hata oluştu:", error);
      }
    }

    fetchData();
  }, []);
  if (rows === null) {
    // Veriler henüz yüklenmediyse bir yükleniyor mesajı veya bileşeni gösterebilirsiniz
    return <div>Loading...</div>;
  }
  return (
    <main>
      {/* Veritabanından gelen verileri kullanabilirsiniz */}
      <ul>
        {rows.map((row) => (
          <li key={row.id}>{row.link}</li>
        ))}
      </ul>
    </main>
  );
}
