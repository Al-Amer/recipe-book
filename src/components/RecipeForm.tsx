"use client";

import { useState, useEffect, FormEvent } from "react";

interface RecipeFormProps {
  userId: string;
}

interface Category {
  id: number;
  name: string;
}

interface Area {
  id: number;
  name: string;
}

export function RecipeForm({ userId }: RecipeFormProps) {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    fetch("/api/categories").then(res => res.json()).then(setCategories);
    fetch("/api/areas").then(res => res.json()).then(setAreas);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !instructions || !categoryId || !areaId) return;

    const res = await fetch("/api/my-recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, title, instructions, categoryId, areaId }),
    });

    if (res.ok) {
      setTitle("");
      setInstructions("");
      setCategoryId(null);
      setAreaId(null);
      alert("Recipe created!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10 p-6 text-black bg-slate-100 rounded shadow">
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Instructions</label>
        <textarea
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          className="w-full p-2 border rounded"
          rows={5}
          required
        />
      </div>

      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={categoryId ?? ""}
            onChange={e => setCategoryId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>Select category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-semibold">Area</label>
          <select
            value={areaId ?? ""}
            onChange={e => setAreaId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>Select area</option>
            {areas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
      </div>

      <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded">
        Add Recipe
      </button>
    </form>
  );
}