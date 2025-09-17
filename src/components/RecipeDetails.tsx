import dbCon from '@/lib/dbCon'
import React from 'react'
import Image from "next/image";
import FavoriteToggle from "./FavoriteToggle"

type Ingredient = {
  name: string;
  measure: string;
};

type RecipeProps = {
  id: number;
  userId: string; // Pass the logged-in user’s id as a prop
};

export const RecipeDetails = async ({ id, userId }: RecipeProps) => {
  const sql = dbCon();    
  try {
    const result = await sql`
      SELECT
        meals.id,
        meals.name AS meal_name,
        categories.name AS category,
        areas.name AS area,
        meals.instructions,
        meals.thumb,
        meals.source,
        meals.youtube,
        COALESCE(
          JSON_AGG(
            DISTINCT JSONB_BUILD_OBJECT(
              'name', ingredients.name,
              'measure', COALESCE(meal_ingredients.measure_text, meas.name)
            )
          ) FILTER (WHERE ingredients.id IS NOT NULL),
          '[]'
        ) AS ingredients
      FROM meals
      LEFT JOIN categories  ON categories.id = meals.category_id
      LEFT JOIN areas       ON areas.id = meals.area_id
      LEFT JOIN meal_ingredients ON meal_ingredients.meal_id = meals.id
      LEFT JOIN ingredients ON ingredients.id = meal_ingredients.ingredient_id
      LEFT JOIN measures meas ON meas.id = meal_ingredients.measure_id
      WHERE meals.id = ${id}
      GROUP BY meals.id, categories.name, areas.name;
    `;
    if (result.length === 0) {
      throw new Error("Meal not found");
    }

    const meal = result[0];
    const ingredients: Ingredient[] = meal.ingredients;

    return (
      <div className="m-5 p-5">
        <div className="flex m-5 p-5">
          <Image
            src={meal.thumb}
            alt={meal.meal_name}
            width={300}
            height={200}
            className="h-auto w-150 max-w-full rounded-lg m-5"
          />
          <div className="m-5 pl-5">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-xl">{meal.meal_name}</h3>

              {/* Heart button goes here */}
              <FavoriteToggle mealId={meal.id} userId={userId} />
            </div>

            <p className="mt-3 italic">
              {meal.category} | {meal.area}
            </p>
            <h3 className="font-bold text-lg">Ingredients :</h3>
            <ul className="list-disc ml-6 mt-3">
              {ingredients.map((ing, idx) => (
                <li key={idx}>
                  {ing.name}: {ing.measure}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="m-5 p-5">
          <p className="mt-3 whitespace-pre-line">{meal.instructions}</p>
        </div>

        {meal.youtube && (
          <div className="m-5 p-5">
            <a
              href={meal.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("components/RecipeDetails.tsx error:", error);
    return (
      <div className="border-2 m-2 p-4 rounded-2xl">
        <h2>Error while loading data</h2>
        <p className="text-red-500">Error 404</p>
        <p>
          The meal with the id of {id} could not be found or an unexpected error
          occurred. Please try again.
        </p>
      </div>
    );
  }
}
