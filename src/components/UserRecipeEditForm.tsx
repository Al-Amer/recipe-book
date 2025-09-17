"use client";

import { useState, useEffect, FormEvent } from "react";

interface UserRecipeEditFormProps {
  recipeId: number;
}

interface Category { id: number; name: string; }
interface Area { id: number; name: string; }
interface IngredientForm { name: string; measure: string; }

export default function UserRecipeEditForm({ recipeId }: UserRecipeEditFormProps) {
  // Form states
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [thumb, setThumb] = useState("");
  const [youtube, setYoutube] = useState("");
  const [source, setSource] = useState("");
  const [ingredients, setIngredients] = useState<IngredientForm[]>([]);

  // Lookup tables
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  // Fetch categories, areas, and recipe data
  useEffect(() => {
    const fetchLookups = async () => {
      const [cats, ars] = await Promise.all([
        fetch("/api/categories").then(r => r.json()),
        fetch("/api/areas").then(r => r.json())
      ]);
      setCategories(cats);
      setAreas(ars);
    };

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/my-recipes/${recipeId}`);
        const data = await res.json();
        if (!data) return;

        setTitle(data.title ?? "");
        setInstructions(data.instructions ?? "");
        setCategoryId(data.category_id ?? null);
        setAreaId(data.area_id ?? null);
        setThumb(data.thumb ?? "");
        setYoutube(data.youtube ?? "");
        setSource(data.source ?? "");

        // Ensure ingredients array exists and map properly
        setIngredients(Array.isArray(data.ingredients) ? data.ingredients.map((ing: any) => ({
          name: ing.name ?? "",
          measure: ing.measure ?? ""
        })) : []);
      } catch (err) {
        console.error("Failed to load recipe:", err);
      }
    };

    fetchLookups();
    fetchRecipe();
  }, [recipeId]);

  // Ingredient handlers
  const addIngredient = () => setIngredients(prev => [...prev, { name: "", measure: "" }]);
  const removeIngredient = (i: number) => setIngredients(prev => prev.filter((_, idx) => idx !== i));
  const updateIngredientName = (i: number, name: string) => setIngredients(prev => {
    const copy = [...prev]; copy[i].name = name; return copy;
  });
  const updateIngredientMeasure = (i: number, measure: string) => setIngredients(prev => {
    const copy = [...prev]; copy[i].measure = measure; return copy;
  });

  // Submit updated recipe
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !instructions || !categoryId || !areaId) return;

    const payload = { title, instructions, categoryId, areaId, thumb, youtube, source, ingredients };

    try {
      const res = await fetch(`/api/my-recipes/${recipeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Recipe updated successfully!");
      } else {
        const data = await res.json();
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error updating recipe:", err);
      alert("An error occurred while updating the recipe.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-6">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded shadow-md text-black">
        {/* Basic Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Basic Information</h2>
          <input placeholder="Title" className="w-full p-2 border rounded text-black" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea placeholder="Instructions" className="w-full p-2 border rounded text-black" rows={5} value={instructions} onChange={e => setInstructions(e.target.value)} required />
          <div className="flex gap-4">
            <select className="flex-1 p-2 border rounded text-black" value={categoryId ?? ""} onChange={e => setCategoryId(Number(e.target.value))} required>
              <option value="" disabled>Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select className="flex-1 p-2 border rounded text-black" value={areaId ?? ""} onChange={e => setAreaId(Number(e.target.value))} required>
              <option value="" disabled>Area</option>
              {areas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
        </section>

        {/* Media */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Media & Links</h2>
          <input placeholder="Thumbnail URL" className="w-full p-2 border rounded text-black" value={thumb} onChange={e => setThumb(e.target.value)} />
          <input placeholder="YouTube URL" className="w-full p-2 border rounded text-black" value={youtube} onChange={e => setYoutube(e.target.value)} />
          <input placeholder="Source URL" className="w-full p-2 border rounded text-black" value={source} onChange={e => setSource(e.target.value)} />
        </section>

        {/* Ingredients */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Ingredients & Measurements</h2>
          {ingredients.map((ingredient, i) => (
            <div key={i} className="border p-3 rounded space-y-2">
              <div className="flex gap-2 items-center">
                <input type="text" placeholder="Ingredient" className="p-1 border rounded flex-1 text-black" value={ingredient.name} onChange={e => updateIngredientName(i, e.target.value)} />
                <input type="text" placeholder="Measurement" className="p-1 border rounded flex-1 text-black" value={ingredient.measure} onChange={e => updateIngredientMeasure(i, e.target.value)} />
                <button type="button" onClick={() => removeIngredient(i)} className="bg-red-500 text-black px-2 rounded">Remove</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addIngredient} className="bg-blue-600 text-black px-4 py-2 rounded mt-2">Add Ingredient</button>
        </section>

        <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded">Update Recipe</button>
      </form>
    </div>
  );
}
