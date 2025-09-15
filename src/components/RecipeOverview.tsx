// get Data with ID from DB and render Data accordingly
import dbCon from "@/lib/dbCon";
import Link from "next/link";

type OverviewProps = {
	mealId: number;
};

const sql = dbCon();

// make FN async and await for SQL Query
// One query to rule them all XD
// query meals table with mealsID
// query other tables dynamically with results from query
export const RecipeOverview = async ({ mealId }: OverviewProps) => {
	// Declaring here because of scope
	let meal_name, thumb, areas_name, categories_name;

	// try-catch-blck because of random erros while destructuring -> for sure internet/db connection issues on my side
	try {
		const result = await sql`
            SELECT
                m.name AS meal_name,
                m.thumb AS thumb,
                c.name AS categories_name,
                a.name AS areas_name
            FROM meals AS m
            LEFT JOIN categories AS c ON c.id = m.category_id
            LEFT JOIN areas AS a ON a.id = m.area_id
            WHERE m.id = ${mealId}
        `;

		// because i was getting random errors wich says result was undefined
		const meal = result[0];
		({ meal_name, thumb, areas_name, categories_name } = meal);
	} catch (error) {
		console.error("An error occured while working with the data:", error);
		return (
			<div className="border-2 m-2 p-4 rounded-2xl">
				<h2>Error while loading data</h2>
				<p>
					The meal with the id of {mealId} could not be found or an
					unexpected error occured, please try again.
				</p>
			</div>
		);
	}

	// Mobie First Design/Development like suggested by Taiwind, add Design for Desktop later if functionality is
	return (
		<div className="border-2 m-2 p-4 rounded-2xl ">
			<h3 className="p-4 text-center">{meal_name}</h3>

			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center">
					<img src={thumb} alt={meal_name} className="size-[50%]" />
					<figcaption>{meal_name}</figcaption>
				</div>
				<div className="flex flex-col items-center">
					<Link href={"/categories"}>
						Category: {categories_name}
					</Link>
					<Link href={"/search"}>Area: {areas_name}</Link>
				</div>
			</div>
		</div>
	);
};
