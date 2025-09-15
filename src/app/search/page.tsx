import Searchbar from "@/components/Searchbar";
import dbCon from "@/lib/dbCon";

interface PageProps {
	searchParams?: {
		query?: string;
	};
}

export default async function SearchResultsPage({ searchParams }: PageProps) {
	const query = searchParams?.query || "";
	// console.log("query:", query);
	// Hier würdest du deine Daten serverseitig basierend auf dem 'query' abrufen
	// const products = await fetchProducts(query);

	const sql = dbCon();

	return (
		<main>
			<h1>Search results</h1>
			<p>
				search term: <strong>{query}</strong>
			</p>

			{/* Optional: Hier kannst du die Suchleiste erneut anzeigen, falls der Nutzer die Suche verfeinern möchte */}
			<Searchbar
				placeholder="Ergebnisse filtern..."
				targetPath="/search"
			/>

			{/* <YourProductTable products={products} /> */}
			<div className="mt-6">
				<p>placeholder for searched products</p>
			</div>
		</main>
	);
}
