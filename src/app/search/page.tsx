// src/app/search/page.tsx
import { RecipeLayout } from "@/components/RecipeLayout";
import Searchbar from "@/components/Searchbar";
import dbCon from "@/lib/dbCon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SearchResultsPage(props: any) {
  const query = props.searchParams?.query || "";

  const sql = dbCon();
  const results = await sql`
    SELECT m.id
    FROM meals AS m
    WHERE m.name LIKE ${"%" + query + "%"}
  `;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mealIds = results.map((result: any) => result.id);

  return (
    <main>
      <h1>Search results</h1>
      <p>
        search term: <strong>{query}</strong>
      </p>

      <Searchbar placeholder="Ergebnisse filtern..." targetPath="/search" />

      <RecipeLayout name="Your search results:" meals={mealIds} />
    </main>
  );
}