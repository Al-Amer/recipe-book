"use client";

import { RecipeForm } from "./RecipeForm";
import { RecipesList } from "./RecipesList";

interface MyRecipesClientProps {
  userId: string;
}

export default function MyRecipesClient({ userId }: MyRecipesClientProps) {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Recipes</h1>
      <RecipeForm userId={userId} />
      <RecipesList userId={userId} />
    </div>
  );
}
