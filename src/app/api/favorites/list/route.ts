// src/app/api/favorites/list/route.ts
import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";

export async function GET(req: Request) {
  const sql = dbCon();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const favorites = await sql<{
      id: number;
      name: string;
      thumb: string;
    }[]>`
      SELECT 
        meals.id,
        meals.name,
        meals.thumb
      FROM favorites
      JOIN meals ON meals.id = favorites.meal_id
      WHERE favorites.user_id = ${userId}
      ORDER BY favorites.created_at DESC
    `;

    return NextResponse.json(favorites);
  } catch (err) {
    console.error("favorites/list error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
