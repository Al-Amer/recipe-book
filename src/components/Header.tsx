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
	const { data: session, status } = useSession(); // get user session

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
				<h1 className="text-2xl font-semibold tracking-tight">
					Recipe Book
				</h1>

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
					<Searchbar
						placeholder="Search for something..."
						targetPath="/search"
					/>

					{/* Conditional Login/Register or Logout */}
					<li className="flex gap-2">
						{status === "loading" ? null : session ? (
							<>
								<span className="px-3 py-1 text-sm">
									{session.user?.name || session.user?.email}
								</span>
								<button
									onClick={() =>
										signOut({ callbackUrl: "/" })
									}
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
			</nav>
		</header>
	);
}
