"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Recipe {
  id: number;
  title: string;
  instructions: string;
}

interface RecipesListProps {
  userId: string;
}

export function RecipesList({ userId }: RecipesListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  const fetchRecipes = async () => {
    try {
      const res = await fetch(`/api/my-recipes?userId=${userId}`, {cache: "no-store"});
      const data = await res.json();

      if (Array.isArray(data)) setRecipes(data);
      else if ("recipes" in data && Array.isArray(data.recipes)) setRecipes(data.recipes);
      else setRecipes([]);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
      setRecipes([]);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchRecipes();
  }, [userId]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      // Use dynamic route URL for DELETE
      const res = await fetch(`/api/my-recipes/${id}`, { method: "DELETE", cache: "no-store" });

      if (res.ok) {
        fetchRecipes(); // Refresh the list after deletion
      } else {
        const data = await res.json();
        alert(`Error deleting recipe: ${data.error}`);
      }
    } catch (err) {
      console.error("Failed to delete recipe:", err);
      alert("Error deleting recipe");
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/my-recipes/${id}/edit`);
  };

  const handleView = (id: number) => {
    router.push(`/my-recipes/${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Recipes</h2>
      {recipes.length === 0 && <p>No recipes yet.</p>}
      <ul className="space-y-4">
        {recipes.map((r) => (
          <li key={r.id} className="p-4 border rounded flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm mt-1">{r.instructions}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleView(r.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(r.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
