// import own DB Connetion
import dbCon from "./dbCon";

// const url =
// 	"postgresql://neondb_owner:npg_4ExAZHwWjD8y@ep-floral-sky-ag9a5k31-pooler.c-2.eu-central-1.aws.neon.tech/recipe-book";
const sql = dbCon();

// // TODO
// adapt FN anatomy to accept needed values
// change SQL query to
// - save Data
// - in correct table(s)

// put sync FN into async FN
async function storeData(tableName: string, name: string) {
	// Check tableName and act accordingly because of different requirements
	switch (tableName) {
		case "areas":
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
			break;
		// TODO
		// Add other cases for Tablles here
		default:
			console.log("wrong name");
	}
}
// // Example usage
// storeData("Mexican");
// console.log(rows); // actual data from DB
export default storeData;
