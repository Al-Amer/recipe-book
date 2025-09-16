import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"
import {RecipeForm} from "../../components/RecipeForm";
import {RecipesList} from "../../components/RecipesList";

export default async function MyRecipesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <p className="text-center mt-20">You must be logged in to view this page.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Recipes</h1>
      <RecipeForm userId={session.user.id} />
      <RecipesList userId={session.user.id} />
    </div>
  );
}
