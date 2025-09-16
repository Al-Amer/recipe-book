"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Meal = {
  id: number;
  name: string;
  thumb: string;
};

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") {
      setLoading(false);
      return;
    }

    const userId = session?.user?.id;

    if (!userId) {
      console.warn("No userId in session");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/favorites/list?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error("Error fetching favorites:", err))
      .finally(() => setLoading(false));
  }, [session, status]);

  if (status === "loading") return <p>Checking authentication...</p>;
  if (status !== "authenticated") return <p>Please log in to see your favorites.</p>;

  const goToRecipe = (id: number) => {
    router.push(`/recipeDetails/${id}`);
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
            <div
              key={meal.id}
              onClick={() => goToRecipe(meal.id)}
              className="rounded-lg shadow-md overflow-hidden bg-white cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={meal.thumb}
                alt={meal.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg text-black font-semibold">{meal.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
