// get Data with ID from DB and render Data accordingly
import dbCon from "@/lib/dbCon";

type OverviewProps = {
	mealId: number;
};

const sql = dbCon();

// make FN async and await for SQL Query
export const RecipeOverview = async ({ mealId }: OverviewProps) => {
	const result = await sql`
    SELECT * FROM meals AS m
    WHERE m.id = ${mealId}
    `;
	// console.log(result);
	const { name, id } = result[0];

	return (
		<div className="border-2 m-2 p-4 rounded-2xl">
			<h3>{name}</h3>
		</div>
	);
};
