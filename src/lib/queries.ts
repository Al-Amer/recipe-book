import "server-only";
import dbCon from "./dbCon";

export async function getMeals(limit = 24, offset = 0) {
	const db = dbCon();
	return db`
    select m.id, m.name, a.name as area, c.name as category, m.thumb
    from meals m
    left join areas a on a.id = m.area_id
    left join categories c on c.id = m.category_id
    order by m.id
    limit ${limit} offset ${offset}
  `;
}
// full detail for a single meal
export async function getMealById(id: number) {
	const sql = dbCon();
	const rows = await sql`
    select
      m.id,
      m.name,
      c.name as category,
      a.name as area,
      m.instructions,
      m.thumb,
      m.source,
      m.youtube,
      coalesce(
        json_agg(
          distinct jsonb_build_object(
            'name', ing.name,
            'measure', coalesce(mi.measure_text, meas.name)
          )
        ) filter (where ing.id is not null),
        '[]'
      ) as ingredients
    from meals m
      left join categories c on c.id = m.category_id
      left join areas a on a.id = m.area_id
      left join meal_ingredients mi on mi.meal_id = m.id
      left join ingredients ing on ing.id = mi.ingredient_id
      left join measures meas on meas.id = mi.measure_id
    where m.id = ${id}
    group by m.id, c.name, a.name
  `;
	return rows[0] ?? null;
}
