// src/app/api/my-recipes/route.ts
import { sql } from "../../../lib/dbCon";
import { NextResponse } from "next/server";

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

    return NextResponse.json(recipes);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
