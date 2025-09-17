// get Data with ID from DB and render Data accordingly
import dbCon from "@/lib/dbCon";
import Link from "next/link";

type OverviewProps = {
  mealId: number;
};

// make FN async and await for SQL Query
// One query to rule them all XD
// query meals table with mealsID
// query other tables dynamically with results from query

export const RecipeOverview = async ({ mealId }: OverviewProps) => {
  const sql = dbCon();

  try {
    // Query meals table along with category and area names
    const result = await sql`
      SELECT
        meals.id,
        meals.name AS meal_name,
        meals.thumb,
        categories.name AS categories_name,
        areas.name AS areas_name
      FROM meals
      LEFT JOIN categories ON categories.id = meals.category_id
      LEFT JOIN areas ON areas.id = meals.area_id
      WHERE meals.id = ${mealId}
    `;

    // Check if result exists
    if (!result || result.length === 0) {
      console.warn(`Meal with id ${mealId} not found`);
      return (
        <div className="border-2 m-2 p-4 rounded-2xl">
          <h2>Meal not found</h2>
          <p>
            The meal with the id of {mealId} could not be found. Please try
            again.
          </p>
        </div>
      );
    }

    const meal = result[0];
    const { meal_name, thumb, areas_name, categories_name } = meal;

    // Render the component
    return (
      <div className="border-2 m-2 p-4 rounded-2xl">
        <div className="flex flex-col items-center">
          <Link href={`/categories/${mealId}`}>
            <h3 className="p-4 text-center">{meal_name}</h3>
            <div className="flex flex-col items-center">
              <img src={thumb} alt={meal_name} className="size-[50%]" />
              <figcaption>{meal_name}</figcaption>
            </div>
          </Link>

          <div className="flex flex-col items-center mt-4">
            <Link href={"/categories"} className="text-blue-600 hover:underline">
              Category: {categories_name}
            </Link>
            <Link href={"/search"} className="text-blue-600 hover:underline">
              Area: {areas_name}
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("An error occurred while working with the data:", error);
    return (
      <div className="border-2 m-2 p-4 rounded-2xl">
        <h2>Error while loading data</h2>
        <p>
          The meal with the id of {mealId} could not be found or an unexpected
          error occurred. Please try again.
        </p>
      </div>
    );
  }
};
