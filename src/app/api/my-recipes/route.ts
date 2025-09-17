import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";

export async function POST(req: Request) {
  const sql = dbCon();

  try {
    const body = await req.json();
    const { userId, title, instructions, categoryId, areaId, thumb, youtube, source, ingredients } = body;

    // Insert recipe into user_recipes
    const [recipe] = await sql`
      INSERT INTO user_recipes (
        user_id, title, instructions, category_id, area_id, thumb, youtube, source
      )
      VALUES (
        ${userId}, ${title}, ${instructions}, ${categoryId}, ${areaId}, ${thumb}, ${youtube}, ${source}
      )
      RETURNING id
    `;
    const recipeId = recipe.id;

    // Insert ingredients
    if (Array.isArray(ingredients) && ingredients.length > 0) {
  for (const ing of ingredients) {
    await sql`
      INSERT INTO recipe_ingredients (recipe_id, name, measure)
      VALUES (${recipeId}, ${ing.name}, ${ing.measure})
    `;
  }
}


    return NextResponse.json({ success: true, id: recipeId }, { status: 201 });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const sql = dbCon();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json([], { status: 200 });

  try {
    const recipes = await sql`
      SELECT *
      FROM user_recipes
      WHERE user_id = ${userId}
      ORDER BY id DESC
    `;
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}
