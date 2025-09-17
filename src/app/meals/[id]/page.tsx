import { getMealById } from "@/lib/queries";

export default async function MealDetail({
	params,
}: {
	params: { id: string };
}) {
	const meal = await getMealById(Number(params.id));
	if (!meal) return <p>Not found</p>;

	return (
		<main>
			<h1>{meal.name}</h1>
			<p>
				{meal.category} {meal.area ? `· ${meal.area}` : ""}
			</p>
			{meal.thumb && <img src={meal.thumb} alt={meal.name} />}
			{meal.instructions && (
				<>
					<h2>Instructions</h2>
					<pre style={{ whiteSpace: "pre-wrap" }}>
						{meal.instructions}
					</pre>
				</>
			)}
			<h2>Ingredients</h2>
			<ul>
				{/* {meal.ingredients.map((it: any, i: number) => ( */}
				{meal.ingredients.map((it: {name:string,measure:string}, i: number) => (
					<li key={i}>
						{it.name}
						{it.measure ? ` — ${it.measure}` : ""}
					</li>
				))}
			</ul>
			{meal.source && (
				<p>
					<a href={meal.source}>Source</a>
				</p>
			)}
			{meal.youtube && (
				<p>
					<a href={meal.youtube}>YouTube</a>
				</p>
			)}
		</main>
	);
}
