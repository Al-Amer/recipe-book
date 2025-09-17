'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FavoriteToggle from './FavoriteToggle';

type Ingredient = { name: string; measure: string; };

type Meal = {
  id: number;
  meal_name: string;
  category: string;
  area: string;
  instructions: string;
  thumb: string;
  source?: string;
  youtube?: string;
  ingredients: Ingredient[];
};

type RecipeProps = { id: number; userId: string; };

export const RecipeDetails = ({ id, userId }: RecipeProps) => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/meals/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load meal");
          return;
        }

        setMeal(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load meal");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !meal)
    return <p className="text-red-500">{error || "Meal not found"}</p>;

  return (
    <div className="m-5 p-5">
      <div className="flex flex-col md:flex-row m-5 p-5">
        <Image
          src={meal.thumb}
          alt={meal.meal_name}
          width={300}
          height={200}
          className="h-auto w-full md:w-150 max-w-full rounded-lg m-5"
        />
        <div className="m-5 pl-5 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-xl">{meal.meal_name}</h3>
            <FavoriteToggle mealId={meal.id} userId={userId} />
          </div>

          <p className="mt-3 italic">{meal.category} | {meal.area}</p>

          <h3 className="font-bold text-lg mt-3">Ingredients:</h3>
          <ul className="list-disc ml-6 mt-2">
            {meal.ingredients.map((ing, idx) => (
              <li key={idx}>{ing.name}: {ing.measure}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="m-5 p-5">
        <p className="mt-3 whitespace-pre-line">{meal.instructions}</p>
      </div>

      {meal.youtube && (
        <div className="m-5 p-5">
          <a href={meal.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
};
