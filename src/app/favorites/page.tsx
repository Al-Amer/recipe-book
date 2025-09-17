"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Meal = {
  id: number;
  name: string;
  thumb: string;
  isFavorite: boolean; // track favorite state
};

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;

  const fetchFavorites = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/favorites/list?userId=${userId}`);
      const data = await res.json();
      setFavorites(
        // data.map((meal: any) => ({ ...meal, isFavorite: true }))
        data.map((meal: Record<string,unknown>) => ({ ...meal, isFavorite: true }))
      );
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [session, status]);

  if (status === "loading") return <p>Checking authentication...</p>;
  if (status !== "authenticated") return <p>Please log in to see your favorites.</p>;

  const goToRecipe = (id: number) => {
    router.push(`/recipeDetails/${id}`);
  };

  const toggleFavorite = async (mealId: number, isFav: boolean) => {
    if (!userId) return;

    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, mealId, favorite: !isFav }),
      });

      if (!res.ok) throw new Error("Failed to toggle favorite");

      // Update local state
      setFavorites((prev) =>
        prev.map((meal) =>
          meal.id === mealId ? { ...meal, isFavorite: !isFav } : meal
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Favorite Recipes</h1>

      {loading ? (
        <p>Loading favorites...</p>
      ) : favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((meal) => (
            <div key={meal.id} className="relative rounded-lg shadow-md overflow-hidden bg-white">
              <img
                src={meal.thumb}
                alt={meal.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => goToRecipe(meal.id)}
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleFavorite(meal.id, meal.isFavorite)}
                  className="text-red-500 text-2xl focus:outline-none"
                >
                  {meal.isFavorite ? "❤️" : "🤍"}
                </button>
              </div>
              <div className="p-4">
                <h2
                  className="text-lg text-black font-semibold cursor-pointer"
                  onClick={() => goToRecipe(meal.id)}
                >
                  {meal.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
