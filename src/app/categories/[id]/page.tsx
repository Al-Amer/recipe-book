import React from 'react';
import { RecipeDetails } from '@/components/RecipeDetails';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CategoryPage(props: any) {
  const categoryId = Number(props.params.id);
  const userId = 'some-user-id';
  return <RecipeDetails id={categoryId} userId={userId} />;
}
