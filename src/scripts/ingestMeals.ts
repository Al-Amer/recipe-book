// scripts/ingestMeals.ts
// run  with "npm run ingest" from terminal
import "dotenv/config";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL!;
if (!DATABASE_URL) throw new Error("DATABASE_URL is missing");

const MAX_CONCURRENCY = Number(process.env.INGEST_MAX_CONCURRENCY ?? 8);
const THROTTLE_MS = Number(process.env.INGEST_THROTTLE_MS ?? 50);
const TARGET_COUNT = Number(process.env.INGEST_TARGET_COUNT ?? 0); // 0 means no cap

const sql = neon(DATABASE_URL);

type ListItem = {
	strCategory?: string;
	strArea?: string;
	strIngredient?: string;
};
type FilterItem = { idMeal: string };
type ApiMeal = {
	idMeal: string;
	strMeal: string;
	strCategory: string | null;
	strArea: string | null;
	strInstructions: string | null;
	strMealThumb: string | null;
	strSource: string | null;
	strYoutube: string | null;
	// ingredients and measures come as strIngredient1..20 and strMeasure1..20
	[k: string]: any;
};

function sleep(ms: number) {
	return new Promise((res) => setTimeout(res, ms));
}

async function fetchJSON<T>(url: string, tries = 3): Promise<T> {
	let lastErr: any;
	for (let i = 0; i < tries; i++) {
		try {
			const r = await fetch(url);
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			return (await r.json()) as T;
		} catch (e) {
			lastErr = e;
			await sleep(200 * (i + 1));
		}
	}
	throw lastErr;
}

/** Upserts returning the id */
async function upsertCategory(name: string | null): Promise<number | null> {
	if (!name) return null;
	const rows = await sql<{ id: number }>`
    INSERT INTO categories (name) VALUES (${name})
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id`;
	return rows[0].id;
}
async function upsertArea(name: string | null): Promise<number | null> {
	if (!name) return null;
	const rows = await sql<{ id: number }>`
    INSERT INTO areas (name) VALUES (${name})
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id`;
	return rows[0].id;
}
async function upsertIngredient(name: string | null): Promise<number | null> {
	const n = (name ?? "").trim();
	if (!n) return null;
	const rows = await sql<{ id: number }>`
    INSERT INTO ingredients (name) VALUES (${n})
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id`;
	return rows[0].id;
}
async function upsertMeasure(name: string | null): Promise<number | null> {
	const n = (name ?? "").trim();
	if (!n) return null;
	const rows = await sql<{ id: number }>`
    INSERT INTO measures (name) VALUES (${n})
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id`;
	return rows[0].id;
}

async function upsertMeal(
	m: ApiMeal,
	categoryId: number | null,
	areaId: number | null
) {
	const id = Number(m.idMeal);
	await sql`
    INSERT INTO meals (id, name, category_id, area_id, instructions, thumb, source, youtube)
    VALUES (
      ${id},
      ${m.strMeal},
      ${categoryId},
      ${areaId},
      ${m.strInstructions},
      ${m.strMealThumb},
      ${m.strSource},
      ${m.strYoutube}
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      category_id = EXCLUDED.category_id,
      area_id = EXCLUDED.area_id,
      instructions = EXCLUDED.instructions,
      thumb = EXCLUDED.thumb,
      source = EXCLUDED.source,
      youtube = EXCLUDED.youtube
  `;
	return id;
}

async function upsertMealIngredients(mealId: number, m: ApiMeal) {
	const rows: {
		ingredient_id: number;
		measure_id: number | null;
		measure_text: string | null;
	}[] = [];

	for (let i = 1; i <= 20; i++) {
		const ing = (m[`strIngredient${i}`] as string | null)?.trim() ?? "";
		const meas = (m[`strMeasure${i}`] as string | null)?.trim() ?? "";
		if (!ing) continue;
		const ingredientId = await upsertIngredient(ing);
		if (!ingredientId) continue;
		const measureId = meas ? await upsertMeasure(meas) : null;
		rows.push({
			ingredient_id: ingredientId,
			measure_id: measureId,
			measure_text: meas || null,
		});
	}

	for (const r of rows) {
		await sql`
      INSERT INTO meal_ingredients (meal_id, ingredient_id, measure_id, measure_text)
      VALUES (${mealId}, ${r.ingredient_id}, ${r.measure_id}, ${r.measure_text})
      ON CONFLICT (meal_id, ingredient_id) DO UPDATE SET
        measure_id = EXCLUDED.measure_id,
        measure_text = EXCLUDED.measure_text
    `;
	}
}

/** Step 1: list categories and areas, upsert vocab */
async function primeVocab() {
	const [catList, areaList] = await Promise.all([
		fetchJSON<{ meals: ListItem[] }>(
			"https://www.themealdb.com/api/json/v1/1/list.php?c=list"
		),
		fetchJSON<{ meals: ListItem[] }>(
			"https://www.themealdb.com/api/json/v1/1/list.php?a=list"
		),
	]);

	for (const c of catList.meals ?? []) {
		if (c.strCategory) await upsertCategory(c.strCategory);
	}
	for (const a of areaList.meals ?? []) {
		if (a.strArea) await upsertArea(a.strArea);
	}
}

/** Step 2: enumerate meal ids deterministically via filters */
async function collectMealIds(): Promise<string[]> {
	const ids = new Set<string>();

	// by category
	const cats = await fetchJSON<{ meals: ListItem[] }>(
		"https://www.themealdb.com/api/json/v1/1/list.php?c=list"
	);
	for (const c of cats.meals ?? []) {
		const cat = c.strCategory?.trim();
		if (!cat) continue;
		const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
			cat
		)}`;
		const res = await fetchJSON<{ meals: FilterItem[] | null }>(url);
		for (const item of res.meals ?? []) ids.add(item.idMeal);
		await sleep(THROTTLE_MS);
	}

	// also by area to catch any not covered by category (paranoia)
	const areas = await fetchJSON<{ meals: ListItem[] }>(
		"https://www.themealdb.com/api/json/v1/1/list.php?a=list"
	);
	for (const a of areas.meals ?? []) {
		const area = a.strArea?.trim();
		if (!area) continue;
		const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(
			area
		)}`;
		const res = await fetchJSON<{ meals: FilterItem[] | null }>(url);
		for (const item of res.meals ?? []) ids.add(item.idMeal);
		await sleep(THROTTLE_MS);
	}

	const arr = Array.from(ids);
	arr.sort((x, y) => Number(x) - Number(y));
	if (TARGET_COUNT > 0) return arr.slice(0, TARGET_COUNT);
	return arr;
}

/** Step 3: hydrate in parallel with a small pool, upsert */
async function hydrateAndInsert(ids: string[]) {
	let done = 0;

	async function processOne(id: string) {
		// lookup full meal
		const data = await fetchJSON<{ meals: ApiMeal[] | null }>(
			`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
		);
		const meal = data.meals?.[0];
		if (!meal) return;

		const [categoryId, areaId] = await Promise.all([
			upsertCategory(meal.strCategory),
			upsertArea(meal.strArea),
		]);

		const mealId = await upsertMeal(meal, categoryId, areaId);
		await upsertMealIngredients(mealId, meal);

		done++;
		if (done % 25 === 0) {
			console.log(`Upserted ${done}/${ids.length} meals...`);
		}
	}

	// simple concurrency pool
	let i = 0;
	const workers: Promise<void>[] = Array.from({
		length: MAX_CONCURRENCY,
	}).map(async () => {
		while (i < ids.length) {
			const id = ids[i++];
			await processOne(id);
			if (THROTTLE_MS) await sleep(THROTTLE_MS);
		}
	});
	await Promise.all(workers);
}

async function main() {
	console.log("Priming vocab...");
	await primeVocab();

	console.log("Collecting meal ids...");
	const ids = await collectMealIds();
	console.log(
		`Found ${ids.length} ids to ingest${
			TARGET_COUNT ? ` (capped at ${TARGET_COUNT})` : ""
		}.`
	);

	console.log("Hydrating and upserting meals...");
	await hydrateAndInsert(ids);

	// quick counts
	const [mealsCount] = await sql<{
		count: string;
	}>`select count(*) from meals`;
	const [ingCount] = await sql<{
		count: string;
	}>`select count(*) from ingredients`;
	const [areasCount] = await sql<{
		count: string;
	}>`select count(*) from areas`;
	const [catsCount] = await sql<{
		count: string;
	}>`select count(*) from categories`;

	console.log(`Done.
  meals:       ${mealsCount.count}
  ingredients: ${ingCount.count}
  areas:       ${areasCount.count}
  categories:  ${catsCount.count}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
