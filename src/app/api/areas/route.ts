import { NextResponse } from "next/server";
import sql from "@/lib/dbCon";

export async function GET() {
  const areas = await sql`SELECT id, name FROM areas ORDER BY name`;
  return NextResponse.json(areas);
}
