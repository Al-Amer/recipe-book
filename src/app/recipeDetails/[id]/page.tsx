// src/app/recipeDetails/[id]/page.tsx
import { RecipeDetails } from "@/components/RecipeDetails";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RecipePage(props: any) {
  const recipeId = Number(props.params.id);
  const userId = "some-user-id";

  return <RecipeDetails id={recipeId} userId={userId} />;
}
