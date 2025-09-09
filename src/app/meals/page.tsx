import { getMeals } from "@/lib/queries";
import Link from "next/link";

export default async function MealsPage() {
	const meals = await getMeals(24, 0);
	console.log(meals[0]);
	return (
		<main>
			<h1>Meals</h1>
			<ul>
				{meals.map((m: any) => (
					<li key={m.id}>
						<Link href={`meals/${m.id}`}>
							{m.name} {m.area ? `(${m.area})` : ""}
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
