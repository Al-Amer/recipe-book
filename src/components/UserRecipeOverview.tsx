import dbCon from "@/lib/dbCon";

type OverviewProps = {
  recipeId: number;
};

export async function UserRecipeOverview({ recipeId }: OverviewProps) {
  const sql = dbCon();

  try {
    // Query recipe details
    const recipeResult = await sql`
      SELECT
        id,
        title,
        instructions,
        thumb
      FROM user_recipes
      WHERE id = ${recipeId}
    `;

    if (!recipeResult || recipeResult.length === 0) {
      console.warn(`User recipe with id ${recipeId} not found`);
      return (
        <div className="border-2 m-2 p-4 rounded-2xl">
          <h2>Recipe not found</h2>
          <p>
            The recipe with the id of {recipeId} could not be found. Please try
            again.
          </p>
        </div>
      );
    }

    const recipe = recipeResult[0];

    // Query ingredients for this recipe
    const ingredientsResult = await sql`
      SELECT name, measure
      FROM recipe_ingredients
      WHERE recipe_id = ${recipeId}
      ORDER BY id
    `;

    return (
      <div className="border-2 m-2 p-6 rounded-2xl">
        <h3 className="mb-6 text-center text-2xl font-semibold">{recipe.title}</h3>

        {/* Image and Ingredients side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {recipe.thumb && (
            <div className="flex justify-center">
              <img
                src={recipe.thumb}
                alt={recipe.title}
                className="w-64 h-auto rounded-md shadow-md"
              />
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">Ingredients</h4>
            {ingredientsResult.length > 0 ? (
              <ul className="list-disc list-inside text-gray-200">
                {ingredientsResult.map((ing, idx) => (
                  <li key={idx}>
                    {ing.name} {ing.measure ? `- ${ing.measure}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No ingredients listed.</p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 text-gray-200 whitespace-pre-line">
          <h4 className="font-semibold mb-2">Instructions</h4>
          {recipe.instructions}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user recipe:", error);
    return (
      <div className="border-2 m-2 p-4 rounded-2xl">
        <h2>Error while loading recipe</h2>
        <p>
          The recipe with the id of {recipeId} could not be loaded. Please try
          again later.
        </p>
      </div>
    );
  }
}
