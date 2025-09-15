"use client";

import { useEffect, useState } from "react";

type Meal = {
  id: number;
  name: string;
  thumb: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    fetch("/api/favorites/list")
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((meal) => (
            <div
              key={meal.id}
              className="rounded-lg shadow-md overflow-hidden bg-white"
            >
              <img
                src={meal.thumb}
                alt={meal.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{meal.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
