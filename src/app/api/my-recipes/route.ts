import { NextRequest, NextResponse } from "next/server";
import { sql } from "../../../lib/dbCon";

// GET: List recipes for user
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json([], { status: 400 });

  const recipes = await sql`
    SELECT id, title, instructions 
    FROM user_recipes 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  `;
  return NextResponse.json(recipes);
}

// POST: Create recipe
export async function POST(req: NextRequest) {
  const { userId, title, instructions, categoryId, areaId } = await req.json();

  const recipe = await sql`
    INSERT INTO user_recipes (user_id, title, instructions) 
    VALUES (${userId}, ${title}, ${instructions}) 
    RETURNING *
  `;
  return NextResponse.json(recipe[0]);
}

// DELETE: Delete recipe
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await sql`DELETE FROM user_recipes WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}
