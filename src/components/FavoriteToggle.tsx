"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface FavoriteToggleProps {
  mealId: number;
}

export default function FavoriteToggle({ mealId }: FavoriteToggleProps) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/favorites/list?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.some((fav: { id: number }) => fav.id === mealId)) {
          setIsFavorite(true);
        }
      });
  }, [userId, mealId]);

  const toggleFavorite = async () => {
    if (!userId) {
      alert("Please log in to save favorites.");
      return;
    }

    const res = await fetch("/api/favorites/toggle", {
      method: "POST",
      body: JSON.stringify({ userId, mealId }),
    });

    if (res.ok) {
      const data = await res.json();
      setIsFavorite(data.favorited);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="text-red-600 text-xl"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
