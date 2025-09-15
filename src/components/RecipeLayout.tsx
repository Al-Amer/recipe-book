import { RecipeOverview } from "./RecipeOverview";

// Define type for Component
type PropSchema = {
	// name for different Texts to display depending on page
	name: string;
	// meals to display
	meals: number[];
};

export const RecipeLayout = ({ name, meals }: PropSchema) => {
	// console.log("log from RecipeLayout:", meals);
	return (
		// return a Layout for reusability in Landing and Search Page
		// Pass in name as Headline

		// ToDO
		// Add a Layout and display recipes with ID from Array
		<section className="border-2 rounded-2xl flex flex-col items-center p-4">
			<h2>{name}</h2>
			<div>
				{/* Use RecipeComponent to display a single recipe */}
				{meals.map((meal) => (
					<RecipeOverview key={meal} mealId={meal} />
				))}
			</div>
		</section>
	);
};
