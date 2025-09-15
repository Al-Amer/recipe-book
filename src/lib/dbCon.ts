import { neon } from "@neondatabase/serverless";

// default parameter/argument with default API to fetch from
const dbCon = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Database URL missing.");
  return neon(url);
};

// Fix: export a ready-to-use client for `sql` queries
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL missing.");
export const sql = neon(url); // <-- call neon() with connection string

export default dbCon;