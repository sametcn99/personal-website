"use client";
import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    const ADMIN_KEY = process.env.ADMIN_KEY;
    console.log(ADMIN_KEY);
    switch (password.length) {
      case 23:
        if (ADMIN_KEY === password) {
          console.log("Giriş başarılı.");
        } else {
          console.log("Giriş başarısız.");
        }
        break;
      case 0:
        console.log("Lütfen bir şifre giriniz.");
        break;
      default:
        console.log("Lütfen 23 karakterli bir şifre giriniz.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-black ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="mb-6">
          <label className="block text-gray-600 text-lg font-medium mb-2">
            Input Admin Key
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-400"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded font-medium"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </main>
  );
}
