import { RecipeOverview } from "./RecipeOverview";
import { LayoutPropSchema } from "@/types/types";

export const RecipeLayout = ({ name, meals }: LayoutPropSchema) => {
	return (
		<section className="border-2 rounded-2xl p-4">
			<h2 className="text-center">{name}</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto">
				{meals.map((meal) => (
					<RecipeOverview key={meal} mealId={meal} />
				))}
			</div>
		</section>
	);
};
