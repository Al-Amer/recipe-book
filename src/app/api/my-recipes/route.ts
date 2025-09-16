// src/app/api/my-recipes/route.ts
import { sql } from "../../../lib/dbCon";
import { NextResponse } from "next/server";

interface IngredientPayload {
  newIngredientName: string;
  measures: { measureText: string }[];
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const recipes = await sql<{ id: number; title: string; instructions: string }[]>`
      SELECT id, title, instructions
      FROM user_recipes
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    // Fetch ingredients for each recipe
    const recipesWithIngredients = await Promise.all(
      recipes.map(async (recipe) => {
        const ingredients = await sql<{ id: number; name: string; measure: string }[]>`
          SELECT id, name, measure
          FROM recipe_ingredients
          WHERE recipe_id = ${recipe.id}
        `;
        return { ...recipe, ingredients };
      })
    );

    return NextResponse.json(recipesWithIngredients);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { userId, title, instructions, categoryId, areaId, thumb, youtube, source, ingredients } = data;

    if (!userId || !title || !instructions || !categoryId || !areaId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert recipe
    const inserted = await sql`
      INSERT INTO user_recipes (user_id, title, instructions, category_id, area_id, thumb, youtube, source)
      VALUES (${userId}, ${title}, ${instructions}, ${categoryId}, ${areaId}, ${thumb}, ${youtube}, ${source})
      RETURNING id
    `;
    const recipeId = inserted[0].id;

    // Insert ingredients
    if (Array.isArray(ingredients)) {
      for (const ing of ingredients) {
        const name = ing.newIngredientName || "";
        // Ensure measures array exists
        const measureText = Array.isArray(ing.measures) && ing.measures[0] ? ing.measures[0].measureText || "" : "";

        await sql`
          INSERT INTO recipe_ingredients (recipe_id, name, measure)
          VALUES (${recipeId}, ${name}, ${measureText})
        `;
      }
    }

    return NextResponse.json({ success: true, recipeId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing recipe ID" }, { status: 400 });
    }

    // Delete ingredients first (foreign key could also cascade)
    await sql`
      DELETE FROM recipe_ingredients
      WHERE recipe_id = ${Number(id)}
    `;

    // Delete recipe
    await sql`
      DELETE FROM user_recipes
      WHERE id = ${Number(id)}
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
