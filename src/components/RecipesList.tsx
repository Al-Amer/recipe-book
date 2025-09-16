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
    const res = await fetch(`/api/my-recipes?userId=${userId}`);
    const data = await res.json();
    setRecipes(data);
  };

useEffect(() => {
  if (!userId) return;

  const fetchRecipes = async () => {
    const res = await fetch(`/api/my-recipes?userId=${userId}`);
    const data = await res.json();
    setRecipes(data);
  };

  fetchRecipes();
}, [userId]);



  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/my-recipes?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchRecipes();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Recipes</h2>
      {recipes.length === 0 && <p>No recipes yet.</p>}
      <ul className="space-y-4">
        {recipes.map(r => (
          <li key={r.id} className="p-4 border rounded flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm mt-1">{r.instructions}</p>
            </div>
            <button
              onClick={() => handleDelete(r.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
