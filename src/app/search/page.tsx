import Searchbar from "@/components/Searchbar";
import dbCon from "@/lib/dbCon";

interface PageProps {
	searchParams?: {
		query?: string;
	};
}

export default async function SearchResultsPage({ searchParams }: PageProps) {
	const query = searchParams?.query || "";

	const sql = dbCon();
	// SQL Query with template for safe access
	const results = await sql`
    SELECT * FROM meals AS m
    WHERE m.name LIKE ${"%" + query + "%"}
    `;
	console.log(results);
	return (
		<main>
			<h1>Search results</h1>
			<p>
				search term: <strong>{query}</strong>
			</p>

			<Searchbar
				placeholder="Ergebnisse filtern..."
				targetPath="/search"
			/>

			{/* Display results from DB Query */}
			<div className="mt-6">
				{results.map((result) => (
					<div key={result.id}>
						<h3>{result.name}</h3>

						<img src={result.thumb} alt={result.name} />
					</div>
				))}
			</div>
		</main>
	);
}
