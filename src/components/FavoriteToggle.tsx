"use client";

import { useState, useEffect } from "react";

export interface FavoriteToggleProps {
  mealId: number;
  userId: string; // required now
}

export default function FavoriteToggle({ mealId, userId }: FavoriteToggleProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`/api/favorites/list?userId=${userId}`);
        const data: { id: number }[] = await res.json();
        setIsFavorite(data.some((fav) => fav.id === mealId));
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };

    fetchFavorites();
  }, [userId, mealId]);

  const toggleFavorite = async () => {
    if (!userId) {
      alert("Please log in to save favorites.");
      return;
    }

    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        body: JSON.stringify({ userId, mealId }),
      });
      if (res.ok) {
        const data: { favorited: boolean } = await res.json();
        setIsFavorite(data.favorited);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
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
