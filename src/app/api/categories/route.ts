import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";
export async function GET() {
  try {
    const sql = dbCon(); // get connection
    const categories = await sql`SELECT * FROM categories ORDER BY name ASC`;
    return NextResponse.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}