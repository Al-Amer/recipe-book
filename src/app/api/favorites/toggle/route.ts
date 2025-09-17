import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";

export async function POST(req: Request) {
  const sql = dbCon();
  try {
    const { userId, mealId } = await req.json();

    if (!userId || !mealId) {
      return NextResponse.json({ error: "Missing userId or mealId" }, { status: 400 });
    }

    // Check if already in favorites
    const existing = await sql`
      SELECT 1 FROM favorites WHERE user_id = ${userId} AND meal_id = ${mealId}
    `;

    if (existing.length > 0) {
      // Remove from favorites
      await sql`
        DELETE FROM favorites WHERE user_id = ${userId} AND meal_id = ${mealId}
      `;
      return NextResponse.json({ favorited: false });
    } else {
      // Add to favorites
      await sql`
        INSERT INTO favorites (user_id, meal_id) VALUES (${userId}, ${mealId})
      `;
      return NextResponse.json({ favorited: true });
    }
  } catch (err) {
    console.error("favorites/toggle error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
