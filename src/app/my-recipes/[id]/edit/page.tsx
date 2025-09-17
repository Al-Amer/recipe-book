import UserRecipeEditForm from "@/components/UserRecipeEditForm";
import dbCon from "@/lib/dbCon";

// Ingredient type
type Ingredient = {
  name: string;
  measure: string;
};

type IngredientRow = {
  name: string;
  measure: string;
};

// Full recipe data type for the edit form
type RecipeData = {
  id: number;
  title: string;
  instructions: string;
  category_id: number;
  area_id: number;
  user_id: string;
  thumb: string;
  youtube: string;
  source: string;
  ingredients: Ingredient[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditRecipePage(props: any) {
  const { params } = props;
  const recipeId = Number(params.id);

  const sql = dbCon();

  // Fetch main recipe data
  const [recipeResult] = await sql`
    SELECT id, title, instructions, category_id, area_id, user_id, thumb, youtube, source
    FROM user_recipes
    WHERE id = ${recipeId}
  `;
  const recipe = recipeResult ?? null;

  if (!recipe) {
    return <p className="text-center mt-20">Recipe not found.</p>;
  }

  // Fetch ingredients
  const ingredientsResult = await sql`
    SELECT name, measure
    FROM recipe_ingredients
    WHERE recipe_id = ${recipeId}
  `;
const ingredients = (ingredientsResult as IngredientRow[]).map((ing) => ({
  name: ing.name,
  measure: ing.measure,
}));

  // Build full recipe data
  const recipeData: RecipeData = {
    id: recipe.id,
    title: recipe.title,
    instructions: recipe.instructions,
    category_id: recipe.category_id,
    area_id: recipe.area_id,
    user_id: recipe.user_id,
    thumb: recipe.thumb,
    youtube: recipe.youtube ?? "",
    source: recipe.source ?? "",
    ingredients,
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Recipe</h1>
      <UserRecipeEditForm recipeId={recipeId} initialData={recipeData} />
    </div>
  );
}
