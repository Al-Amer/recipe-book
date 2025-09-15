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
    const user = await sql`SELECT id FROM users WHERE email = ${session.user.email}`;
    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userId = user[0].id;

    await sql`DELETE FROM favorites WHERE user_id = ${userId} AND meal_id = ${mealId}`;

    return NextResponse.json({ message: "Favorite removed" });
  } catch (err) {
    console.error("Remove favorite error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
