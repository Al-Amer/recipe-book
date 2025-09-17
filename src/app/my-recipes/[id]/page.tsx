'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { UserRecipeOverview } from '@/components/UserRecipeOverview';
import Link from 'next/link';

export default function MyRecipeEditPage() {
  const params = useParams();
  const recipeId = Number(params?.id);

  if (!recipeId) return <p>Invalid recipe ID</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      {/* Recipe Overview */}
      <UserRecipeOverview recipeId={recipeId} />

      {/* Edit button */}
      <div className="flex justify-center">
        <Link
          href={`/my-recipes/${recipeId}/edit`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Edit Recipe
        </Link>
      </div>
    </div>
  );
}
