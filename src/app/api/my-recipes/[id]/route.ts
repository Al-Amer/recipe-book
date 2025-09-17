import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";

// GET recipe by ID with ingredients
export async function GET(
  _req: Request,
  context: { params: { id: string } } // <-- use context instead of destructuring
) {
  const sql = dbCon();
  const recipeId = Number(context.params.id); // <-- use context.params.id

  try {
    // Fetch recipe
    const [recipe] = await sql`
      SELECT *
      FROM user_recipes
      WHERE id = ${recipeId}
    `;

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // Fetch associated ingredients
    const ingredients = await sql`
      SELECT name, measure
      FROM recipe_ingredients
      WHERE recipe_id = ${recipeId}
    `;

    // Return recipe + ingredients
    return NextResponse.json({ ...recipe, ingredients });
  } catch (err) {
    console.error("Error fetching recipe:", err);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}

// PATCH / update recipe by ID
export async function PATCH(
  req: Request,
  context: { params: { id: string } } // <-- use context here too
) {
  const sql = dbCon();
  const recipeId = Number(context.params.id); // <-- context.params.id
  const { title, instructions, categoryId, areaId, thumb, youtube, source, ingredients } =
    await req.json();

  try {
    // Update recipe fields, including category_id and area_id
    await sql`
      UPDATE user_recipes
      SET title = ${title},
          instructions = ${instructions},
          category_id = ${categoryId},
          area_id = ${areaId},
          thumb = ${thumb},
          youtube = ${youtube},
          source = ${source}
      WHERE id = ${recipeId}
    `;

    // Delete existing ingredients
    await sql`DELETE FROM recipe_ingredients WHERE recipe_id = ${recipeId}`;

    // Insert new ingredients
    if (Array.isArray(ingredients)) {
      for (const ing of ingredients) {
        await sql`
          INSERT INTO recipe_ingredients (recipe_id, name, measure)
          VALUES (${recipeId}, ${ing.name}, ${ing.measure})
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating recipe:", err);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}
