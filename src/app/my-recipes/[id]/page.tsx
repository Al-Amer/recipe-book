import { UserRecipeOverview } from "@/components/UserRecipeOverview";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default async function RecipePage(props: PageProps) {
  // Await props to satisfy Next.js App Router runtime
  const { params } = await props;
  const recipeId = Number(params.id);

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