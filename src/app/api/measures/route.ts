import { NextResponse } from "next/server";
import dbCon from "@/lib/dbCon";

export async function GET() {
  try {
    const sql = dbCon();
    const measures = await sql`
      SELECT id, name
      FROM measures
      ORDER BY name ASC
    `;

    // Cast after query
    return NextResponse.json(measures as { id: number; name: string }[]);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}
