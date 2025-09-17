import { getMeals } from '@/lib/queries';
import Link from 'next/link';

type Meal = {
  id: number;
  name: string;
  area: string;
  category: string;
  thumb: string;
};

export default async function MealsPage() {
  const meals = (await getMeals(24, 0)) as Meal[];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meals</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {meals.map((m) => (
          <li key={m.id} className="p-2 bg-white shadow rounded hover:bg-gray-50">
            <Link href={`/meals/${m.id}`}>
              <div className="text-lg font-semibold">{m.name}</div>
              {m.area && <div className="text-sm text-gray-500">{m.area}</div>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
