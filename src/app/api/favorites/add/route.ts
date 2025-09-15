import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbCon from "@/lib/dbCon";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { mealId } = await req.json();
  if (!mealId) {
    return NextResponse.json({ message: "mealId is required" }, { status: 400 });
  }

  const sql = dbCon();

  try {
    // get user_id from users table
    const user = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;
    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user[0].id;

    // insert favorite
    await sql`
      INSERT INTO favorites (user_id, meal_id)
      VALUES (${userId}, ${mealId})
      ON CONFLICT (user_id, meal_id) DO NOTHING
    `;

    return NextResponse.json({ message: "Favorite added" });
  } catch (err) {
    console.error("Add favorite error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
