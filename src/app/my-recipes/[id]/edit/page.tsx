"use client";

import { useParams, useRouter } from "next/navigation";
import UserRecipeEditForm from "@/components/UserRecipeEditForm";

export default function EditRecipePage() {
  const params = useParams();
  const recipeId = Number(params.id);
  const router = useRouter();

  // Optional: you could handle redirect if recipeId is invalid
  if (isNaN(recipeId)) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Invalid Recipe ID</h1>
        <p>Please check the URL and try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
      <UserRecipeEditForm recipeId={recipeId} />
    </div>
  );
}
