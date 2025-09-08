// import for DB Connection
import { neon } from "@neondatabase/serverless";

// default parameter/argument with default API to fetch from
const dbCon = (
	url: string = "postgresql://neondb_owner:npg_4ExAZHwWjD8y@ep-floral-sky-ag9a5k31-pooler.c-2.eu-central-1.aws.neon.tech/recipe-book"
) => {
	return neon(url);
};

export default dbCon;
