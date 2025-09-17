import { RecipeLayout } from "@/components/RecipeLayout";
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
    SELECT m.id FROM meals AS m
    WHERE m.name LIKE ${"%" + query + "%"}
    `;
	// console.log(results);
	// extract ids from Object into simple array to reuse Component from Landing Page
	const mealIds = results.map((result) => {
		return result.id;
	});
	console.log(mealIds);
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

			{/* Display results from DB Query/extracted Array */}
			<RecipeLayout name="Your search results:" meals={mealIds} />
		</main>
	);
}
