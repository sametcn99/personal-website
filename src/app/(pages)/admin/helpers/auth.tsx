"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Auth() {
  const [login, setLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (login === false) {
      router.push("/admin/login");
    } else {
      router.push("/admin");
    }
  }, [login]);

  // Login durumuna göre başka bir şey döndürebilirsiniz
  return (
    <div>
      {login ? <p>Authenticated</p> : <p>Not Authenticated</p>}
    </div>
  );
}
