// src/app/my-recipes/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import MyRecipesClient from "./MyRecipesClient";

export default async function MyRecipesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <p className="text-center mt-20">You must be logged in to view this page.</p>;
  }

  return <MyRecipesClient userId={session.user.id} />;
}
