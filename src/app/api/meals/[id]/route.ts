
import dbCon from "@/lib/dbCon";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sql = dbCon();
    const meal =
      await sql`SELECT id, category_id, name, thumb FROM meals WHERE id = ${params.id}`;
    if (!meal || meal.length === 0) {
      return NextResponse.json({ message: "Meal not found" }, { status: 404 });
    }
    return NextResponse.json(meal[0]);
  } catch (err) {
    console.error("Error fetching meal:", err);
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}


      // await sql`SELECT id, category_id, name, thumb FROM meals WHERE id = ${params.id}`;
