import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";

// Helper to extract recipe ID from request URL
function getRecipeId(req: Request): number {
  const url = new URL(req.url);
  const segments = url.pathname.split("/").filter(Boolean);
  const idStr = segments[segments.length - 1]; // last segment is the ID
  const id = Number(idStr);
  if (isNaN(id)) throw new Error("Invalid recipe ID in URL");
  return id;
}

// GET recipe by ID with ingredients
export async function GET(req: Request) {
  const recipeId = getRecipeId(req);
  const sql = dbCon();

  try {
    const [recipe] = await sql`
      SELECT *
      FROM user_recipes
      WHERE id = ${recipeId}
    `;

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const ingredients = await sql`
      SELECT name, measure
      FROM recipe_ingredients
      WHERE recipe_id = ${recipeId}
    `;

    return NextResponse.json({ ...recipe, ingredients });
  } catch (err) {
    console.error("Error fetching recipe:", err);
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 });
  }
}

// PATCH / update recipe by ID
export async function PATCH(req: Request) {
  const recipeId = getRecipeId(req);
  const sql = dbCon();
  const { title, instructions, categoryId, areaId, thumb, youtube, source, ingredients } =
    await req.json();

  try {
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

    await sql`DELETE FROM recipe_ingredients WHERE recipe_id = ${recipeId}`;

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
    return NextResponse.json({ error: "Failed to update recipe" }, { status: 500 });
  }
}

// DELETE recipe by ID
export async function DELETE(req: Request) {
  const recipeId = getRecipeId(req);
  const sql = dbCon();

  try {
    await sql`DELETE FROM recipe_ingredients WHERE recipe_id = ${recipeId}`;
    await sql`DELETE FROM user_recipes WHERE id = ${recipeId}`;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}
