"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Searchbar from "./Searchbar";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4 md:px-6">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-semibold tracking-tight cursor-pointer" onClick={() => router.push("/")}>
          Recipe Book
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors duration-200 ${
                  pathname === link.href ? "text-indigo-400" : "hover:text-indigo-300"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {status === "authenticated" && (
            <>
              <li>
                <Link
                  href="/favorites"
                  className={`transition-colors duration-200 ${
                    pathname === "/favorites" ? "text-indigo-400" : "hover:text-indigo-300"
                  }`}
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/my-recipes"
                  className={`transition-colors duration-200 ${
                    pathname === "/my-recipes" ? "text-indigo-400" : "hover:text-indigo-300"
                  }`}
                >
                  My Recipes
                </Link>
              </li>
            </>
          )}

          <li>
            <Searchbar placeholder="Search for something..." targetPath="/search" />
          </li>

          <li className="flex gap-2">
            {status === "loading" ? null : session ? (
              <>
                <span className="px-3 py-1 text-sm">{session.user?.name || session.user?.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            <span className="text-2xl">{mobileMenuOpen ? "✖️" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 transition-colors duration-200 ${
                pathname === link.href ? "text-indigo-400" : "hover:text-indigo-300"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {status === "authenticated" && (
            <>
              <Link
                href="/favorites"
                className={`block py-2 transition-colors duration-200 ${
                  pathname === "/favorites" ? "text-indigo-400" : "hover:text-indigo-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Favorites
              </Link>
              <Link
                href="/my-recipes"
                className={`block py-2 transition-colors duration-200 ${
                  pathname === "/my-recipes" ? "text-indigo-400" : "hover:text-indigo-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Recipes
              </Link>
            </>
          )}

          <div className="py-2">
            <Searchbar placeholder="Search for something..." targetPath="/search" />
          </div>

          <div className="flex flex-col gap-2">
            {status === "loading" ? null : session ? (
              <>
                <span className="px-3 py-1 text-sm">{session.user?.name || session.user?.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
