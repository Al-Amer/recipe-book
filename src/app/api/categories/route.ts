// src/app/api/categories/route.ts
import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";

export async function GET() {
  try {
    const sql = dbCon(); // establish database connection

    // Fetch all categories ordered by name
    const categories = await sql`
      SELECT *
      FROM categories
      ORDER BY name ASC
    `;

    // Return as JSON response
    return NextResponse.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);

    return NextResponse.json(
      {
        message: "Server error",
        error: String(err),
      },
      { status: 500 }
    );
  }
}
