"use client";
import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

  /**
   * Handles the login process.
   *
   * @returns void
   */
  const handleLogin = () => {
    switch (password.length) {
      case 24:
        if (ADMIN_KEY === password) {
          setErrorMessage("");
        } else {
          setErrorMessage("Login unsuccessful.");
        }
        break;
      case 0:
        setErrorMessage("Please enter a password.");
        break;
      default:
        setErrorMessage("Please enter a 24-character password.");
    }
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-black select-none bg-black">
      <div className="bg-white bg-opacity-5 p-8 rounded w-96">
        <div className="">
          <label className="block text-gray-200 text-lg font-medium mb-2">
            Input Admin Key
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-400"
            placeholder="input password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && ( // Hata mesajı varsa, onu görüntüle
            <div className="text-red-500">{errorMessage}</div>
          )}
        </div>

        <button
          className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded font-medium mt-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </main>
  );
}
