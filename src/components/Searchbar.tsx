"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchbarProps {
	placeholder: string;
	targetPath: string; // Der neue Prop für den Zielpfad
}

export default function Searchbar({ placeholder, targetPath }: SearchbarProps) {
	const searchParams = useSearchParams();
	const { push } = useRouter(); // Wir verwenden jetzt `push` statt `replace`

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}

		// Navigiere zum Zielpfad mit den Suchparametern
		push(`${targetPath}?${params.toString()}`);
	}, 300);

	return (
		<div className="relative flex flex-1 flex-shrink-0">
			<label htmlFor="search" className="sr-only">
				Suchen
			</label>
			<input
				className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get("query")?.toString()}
			/>
		</div>
	);
}
