"use client";

import { useEffect, useState } from "react";

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

  const fetchRecipes = async () => {
    try {
      const res = await fetch(`/api/my-recipes?userId=${userId}`);
      const data = await res.json();

      // Ensure we get an array of recipes
      if (Array.isArray(data)) {
        setRecipes(data);
      } else if ("recipes" in data && Array.isArray(data.recipes)) {
        setRecipes(data.recipes);
      } else {
        setRecipes([]);
      }
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
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(`/api/my-recipes?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchRecipes();
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Recipes</h2>
      {recipes.length === 0 ? <p>No recipes yet.</p> : null}
      <ul className="space-y-4">
        {recipes.map((r) => (
          <li key={r.id} className="p-4 border rounded flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm mt-1">{r.instructions}</p>
            </div>
            <button
              onClick={() => handleDelete(r.id)}
              className="bg-red-600 text-black px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
