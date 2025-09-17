// src/app/my-recipes/[id]/edit/page.tsx
import UserRecipeEditForm from "@/components/UserRecipeEditForm";
import dbCon from "@/lib/dbCon";

interface EditPageProps {
  params: { id: string };
}

export default async function EditRecipePage(props: EditPageProps) {
  const { params } = await props;
  const recipeId = Number(params.id);

  // Server-side fetch
  const sql = dbCon();
  const [recipe] = await sql`
    SELECT *
    FROM user_recipes
    WHERE id = ${recipeId}
  `;
  const ingredients = await sql`
    SELECT name, measure
    FROM recipe_ingredients
    WHERE recipe_id = ${recipeId}
  `;

  const recipeData = { ...recipe, ingredients };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Recipe</h1>
      <UserRecipeEditForm recipeId={recipeId} initialData={recipeData} />
    </div>
  );
}
