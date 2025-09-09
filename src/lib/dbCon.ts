// import for DB Connection
import { neon } from "@neondatabase/serverless";

// default parameter/argument with default API to fetch from
const dbCon = () => {
	const url = process.env.DATABASE_URL;
	if (!url) throw new Error("Database URL missing.");
	return neon(url);
};

export default dbCon;
