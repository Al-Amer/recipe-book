// src/app/api/favorites/route.ts
import { sql } from "@/lib/dbCon";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, mealId } = await req.json();

    if (!userId || !mealId) {
      return NextResponse.json({ error: "Missing userId or mealId" }, { status: 400 });
    }

    // Check if already favorited
    const existing = await sql`SELECT * FROM favorites WHERE user_id = ${userId} AND meal_id = ${mealId}`;

    if (existing.length > 0) {
      // Remove favorite
      await sql`DELETE FROM favorites WHERE user_id = ${userId} AND meal_id = ${mealId}`;
      return NextResponse.json({ favorited: false });
    } else {
      // Add favorite
      await sql`
        INSERT INTO favorites (user_id, meal_id)
        VALUES (${userId}, ${mealId})
      `;
      return NextResponse.json({ favorited: true });
    }
  } catch (err) {
    console.error("favorites/route.ts error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
