import { RecipeLayout } from "@/components/RecipeLayout";
import dbCon from "@/lib/dbCon";
import { getRandomMeals } from "@/lib/randomFromDB";

const sql = dbCon();

// get some random meals, change for another amount to display
const randomMeals = getRandomMeals(10);

export default function Home() {
	console.log("From Landing Page:", randomMeals);
	return (
		// Return Layout with two Articles nested in sections
		<main className="p-4">
			<h1 className="p-4 flex justify-center">
				Welcome to our recipe book
			</h1>
			<section className="p-4 border-b-2">
				<article>
					A healthy diet involves eating a wide variety of
					nutrient-rich foods, including fruits, vegetables, whole
					grains, lean proteins, and healthy fats, to provide energy,
					support bodily functions, and prevent diseases like heart
					disease, diabetes, and certain cancers. It's important to
					limit salt, sugar, and unhealthy fats while drinking plenty
					of water to maintain overall health, boost immunity, and
					improve brain function.
				</article>
			</section>
			<section className="p-4">
				<article>
					Food is the fuel that keeps us running throughout the day,
					and it also supports the body’s metabolic process and
					ensures we remain healthy. Children need to understand the
					importance of food to build healthy eating habits in the
					long term. They also need to learn that the body needs
					energy from healthy food to conduct day-to-day activities.
					Writing an essay on food in English is a great way to get
					kids acquainted with important information on the different
					food categories and their role in our diets. In this blog,
					we have put together a few examples of essays on food for
					classes 1, 2 & 3 that are easy to understand and
					informative.
				</article>
			</section>
			<RecipeLayout
				name={"Here are some example recipes"}
				meals={randomMeals}
			/>
		</main>
	);
}
