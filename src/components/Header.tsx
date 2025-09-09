"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/categories", label: "Categories" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold tracking-tight">Recipe Book</h1>

        <ul className="flex gap-6 text-sm font-medium items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-indigo-400"
                    : "hover:text-indigo-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Search bar */}
          <li>
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter recipe..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-1 rounded-md text-white outline-solid outline-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Search
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}
