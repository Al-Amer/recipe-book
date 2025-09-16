// Placeholder file
// paste logic to get ids from db and get a random item in range of given ids

import dbCon from "@/lib/dbCon";

const sql = dbCon();

// helper Vars to get start and end of DB entrys and runtime
const minDbEntry = await sql`
    SELECT MIN(id) FROM meals;
`;
const maxDbEntry = await sql`
	SELECT MAX(id) FROM meals
`;

// Calculate random id in range of given ids
// thx again to Gemini, second time i got this
export function getRandomNumberInRange(min: number, max: number): number {
	// Der Bereich ist (max - min + 1), um den max-Wert zu inkludieren.
	const range = max - min + 1;
	return Math.floor(Math.random() * range) + min;
}

// export an spezific mount of random meals
export function getRandomMeals(amount: number) {
	// define Array to store and return
	let randomMeals: number[] = [];
	// loop an "amount" times
	for (let i = 0; i < amount; i++) {
		// store meal with random id in array

		// TODO
		// dapt type definition and hoist them into types file because its needed at atleast three points
		// change Type to an Array with nested Objects
		// array = [{id: 1}, {id:2}]

		randomMeals.push(
			getRandomNumberInRange(minDbEntry[0].min, maxDbEntry[0].max)
		);
	}
	return randomMeals;
}
export default getRandomMeals;
