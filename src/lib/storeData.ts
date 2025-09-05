// import for DB Connection
import { neon } from "@neondatabase/serverless";

const url =
	"postgresql://neondb_owner:npg_4ExAZHwWjD8y@ep-floral-sky-ag9a5k31-pooler.c-2.eu-central-1.aws.neon.tech/recipe-book";
const sql = neon(url);
// put sync FN into async FN

// passe FN an um
// um gefetchte Daten richtig in die DB zu sichern

// SaveInDB FN (name, zutaten, ...) { sql" füge Daten in die richtige Tabelle"}
async function storeData(name: string) {
	const rows = await sql`
    INSERT INTO areas (name)
    VALUES (${name})
    ON CONFLICT (name) DO NOTHING
    RETURNING id, name
  `;
	if (rows.length === 0) {
		console.log(`Area "${name}" already exists.`);
	} else {
		console.log(`Inserted new area:`, rows[0]);
	}
}
// // Example usage
// storeData("Mexican");
// console.log(rows); // actual data from DB
export default storeData;
