'use client';

import React from 'react';
import { RecipeDetails } from '@/components/RecipeDetails';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MealPage(props: any) {
  const mealId = Number(props.params.id);
  const userId = 'some-user-id'; // replace with logged-in user ID
  return <RecipeDetails id={mealId} userId={userId} />;
}
