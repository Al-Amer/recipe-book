import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";

export async function GET() {
  try {
    const sql = dbCon(); // get connection
    const areas = await sql`SELECT * FROM areas ORDER BY name ASC`;
    return NextResponse.json(areas);
  } catch (err) {
    console.error("Error fetching areas:", err);
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
  }
}
