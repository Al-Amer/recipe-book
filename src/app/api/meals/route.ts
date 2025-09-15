import dbCon from "@/lib/dbCon";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const sql = dbCon();
        const meals = await sql'SELECT id ,category_id ,name ,thumb FROM meals';
        return NextResponse.json(meals);
    }catch(err){
        console.error("Error fetching categories:", err);
    return NextResponse.json(
      { message: "Server error", error: String(err) },
      { status: 500 }
    );
    }
    
}

//        const product = await sql'SELECT id, category_id, name, thumb FROM meals';
//      SELECT * thumb FROM meals