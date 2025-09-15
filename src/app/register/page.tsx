"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      // Redirect to login after successful registration
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
      setError("An unexpected error occurred");
      }
    }
  };


  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-slate-800 text-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Register</h1>

      {error && <p className="mb-2 text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}