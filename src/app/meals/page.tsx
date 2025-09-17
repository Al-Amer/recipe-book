import { getMeals } from "@/lib/queries";
import Link from "next/link";
type meal = {
	id:number;
	name:string;
	area:string;
	category:string;
	thumb:string;
}
export default async function MealsPage() {
	const meals = await getMeals(24, 0);
	console.log(meals[0]);
	return (
		<main>
			<h1>Meals</h1>
			<ul>
				{/* {meals.map((m: any) => ( */}
				{meals.map((m) => (
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
