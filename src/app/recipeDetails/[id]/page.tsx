import { RecipeDetails } from "@/components/RecipeDetails";

interface RecipePageProps {
  params: { id: string };
}

// default export a server component
export default async function Page({ params }: RecipePageProps) {
  const id = Number(params.id); // convert route param to number
  return <RecipeDetails id={id} />;
}
