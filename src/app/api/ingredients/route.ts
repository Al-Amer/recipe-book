import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";

export async function GET() {
  try {
    const sql = dbCon();
    const ingredients = await sql`
      SELECT name
      FROM ingredients
      ORDER BY name ASC
    `;
    return NextResponse.json(ingredients as { name: string }[]);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}
