"use client";

import { useState, useEffect, FormEvent } from "react";

interface RecipeFormProps { userId: string; }
interface Category { id: number; name: string; }
interface Area { id: number; name: string; }
interface Ingredient { id: number; name: string; }
interface Measure { id: number; name: string; }
interface IngredientForm {
  ingredientId: number | null;
  newIngredientName?: string;
  measures: { measureId: number | null; measureText: string }[];
}

export function RecipeForm({ userId }: RecipeFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [thumb, setThumb] = useState("");
  const [youtube, setYoutube] = useState("");
  const [source, setSource] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [ingredients, setIngredients] = useState<IngredientForm[]>([]);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [allMeasures, setAllMeasures] = useState<Measure[]>([]);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(setCategories);
    fetch("/api/areas").then(r => r.json()).then(setAreas);
    fetch("/api/ingredients").then(r => r.json()).then((data: Ingredient[]) => {
      setAllIngredients(data);
      setIngredients([{ ingredientId: null, measures: [{ measureId: null, measureText: "" }] }]);
    });
    fetch("/api/measures").then(r => r.json()).then(setAllMeasures);
  }, []);

  const handleToggleForm = () => setShowForm(prev => !prev);

  const addIngredient = () => {
    setIngredients(prev => [...prev, { ingredientId: null, measures: [{ measureId: null, measureText: "" }] }]);
  };

  const removeIngredient = (i: number) => {
    setIngredients(prev => prev.filter((_, idx) => idx !== i));
  };

  const addMeasure = (i: number) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[i].measures.push({ measureId: null, measureText: "" });
      return copy;
    });
  };

  const removeMeasure = (i: number, idx: number) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[i].measures.splice(idx, 1);
      return copy;
    });
  };

  const updateIngredientId = (i: number, id: number | null) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[i].ingredientId = id;
      copy[i].newIngredientName = undefined;
      return copy;
    });
  };

  const updateNewIngredientName = (i: number, name: string) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[i].newIngredientName = name;
      copy[i].ingredientId = null;
      return copy;
    });
  };

  const updateMeasure = (i: number, idx: number, measureId: number | null) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[i].measures[idx].measureId = measureId;
      return copy;
    });
  };

  const updateMeasureText = (i: number, idx: number, text: string) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[i].measures[idx].measureText = text;
      return copy;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId || !title || !instructions || !categoryId || !areaId) return;

    const payload = { userId, title, instructions, categoryId, areaId, thumb, youtube, source, ingredients };
    const res = await fetch("/api/my-recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Recipe created!");
      setTitle(""); setInstructions(""); setCategoryId(null); setAreaId(null);
      setThumb(""); setYoutube(""); setSource("");
      setIngredients([{ ingredientId: null, measures: [{ measureId: null, measureText: "" }] }]);
      setShowForm(false); // automatically collapse after submission
    } else {
      const data = await res.json();
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-6">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={handleToggleForm}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded mb-4 text-lg font-semibold"
      >
        {showForm ? "Hide Form" : "Create Recipe"}
      </button>

      {/* Collapsible Form */}
      <div
        className={`overflow-hidden transition-all duration-300 ${showForm ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
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

          {/* Ingredients & Measurements */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Ingredients & Measurements</h2>
            {ingredients.map((ingredient, i) => (
              <div key={i} className="border p-3 rounded space-y-2">
                <div className="flex gap-2 items-center">
                  <select className="p-1 border rounded text-black flex-1" value={ingredient.ingredientId ?? ""} onChange={e => updateIngredientId(i, Number(e.target.value) || null)}>
                    <option value="">Select ingredient</option>
                    {allIngredients.map(ing => <option key={ing.id} value={ing.id}>{ing.name}</option>)}
                  </select>
                  <input type="text" placeholder="Or new ingredient" className="p-1 border rounded flex-1 text-black" value={ingredient.newIngredientName || ""} onChange={e => updateNewIngredientName(i, e.target.value)} />
                  <button type="button" onClick={() => removeIngredient(i)} className="bg-red-500 text-black px-2 rounded">Remove</button>
                </div>

                {ingredient.measures.map((m, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <select className="p-1 border rounded text-black text-xs" value={m.measureId ?? ""} onChange={e => updateMeasure(i, idx, Number(e.target.value) || null)}>
                      <option value="">Select measure</option>
                      {allMeasures.map(me => <option key={me.id} value={me.id}>{me.name}</option>)}
                    </select>
                    <input type="text" placeholder="Or custom measure" className="p-1 border rounded flex-1 text-black" value={m.measureText} onChange={e => updateMeasureText(i, idx, e.target.value)} />
                    <button type="button" onClick={() => removeMeasure(i, idx)} className="bg-red-500 text-black px-2 rounded">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => addMeasure(i)} className="bg-green-500 text-black px-3 py-1 rounded mt-1">Add Measure</button>
              </div>
            ))}
            <button type="button" onClick={addIngredient} className="bg-blue-600 text-black px-4 py-2 rounded mt-2">Add Ingredient</button>
          </section>

          <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}
