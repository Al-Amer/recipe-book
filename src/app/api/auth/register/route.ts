import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/dbCon"; // use the exported 'sql'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    // check if user already exists
    const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // hash password with bcryptjs
    const password_hash = await bcrypt.hash(password, 10);

    // insert new user
    await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${email}, ${password_hash})
    `;

    return NextResponse.json({ message: "User created" });
  } catch (err: unknown) {
    // Narrow unknown to Error
    const errorMessage =
      err instanceof Error ? err.message : "Unknown server error";

    console.error("Register API error:", errorMessage);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
