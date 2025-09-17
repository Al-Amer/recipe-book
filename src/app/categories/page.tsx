'use client';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

// Icon imports
import IconBeef from '../../../IconCategories/Beef.png';
import IconBreakfast from '../../../IconCategories/Brekfast.png';
import IconChicken from '../../../IconCategories/Chicken.png';
import IconDessert from '../../../IconCategories/Dessert.png';
import IconGoat from '../../../IconCategories/Goat.png';
import IconLamb from '../../../IconCategories/Lamb.png';
import IconMiscellaneous from '../../../IconCategories/miscellaneous.png';
import IconPasta from '../../../IconCategories/Pasta.png';
import IconPork from '../../../IconCategories/Pork.png';
import IconSeafood from '../../../IconCategories/seafood.png';
import IconSide from '../../../IconCategories/Side.png';
import IconStarter from '../../../IconCategories/Starter.png';
import IconVagen from '../../../IconCategories/Vegan.png';
import IconVegetarian from '../../../IconCategories/vegetarin.png';

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  category_id: number;
  name: string;
  thumb: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [limit, setLimit] = useState(25);

  // FIX: Use StaticImageData[] instead of string[]
  const IconCategories: StaticImageData[] = [
    IconBeef,
    IconBreakfast,
    IconChicken,
    IconDessert,
    IconGoat,
    IconLamb,
    IconMiscellaneous,
    IconPasta,
    IconPork,
    IconSeafood,
    IconSide,
    IconStarter,
    IconVagen,
    IconVegetarian,
  ];

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch('/api/meals')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts =
    selectedCategory === null
      ? products.slice(0, limit)
      : products.filter((p) => p.category_id === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Categories */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Categories</h1>
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setLimit(25);
                }}
                className={`cursor-pointer p-1 bg-white shadow-md rounded-lg hover:bg-gray-50 text-black justify-center text-center ${
                  selectedCategory === cat.id ? 'border-2 border-blue-500' : ''
                }`}
              >
                <Link href={`/categories/${cat.id}`}>
                  <div className="relative h-40 w-40 mx-auto">
                    <Image
                      src={IconCategories[cat.id - 1]}
                      alt={cat.name}
                      width={150}
                      height={150}
                      className="object-cover rounded-lg hover:scale-105"
                    />
                  </div>
                  <p className="mt-2">{cat.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Products */}
      <div className="mt-10">
        <h1 className="text-xl font-semibold mb-4">
          {selectedCategory
            ? `Meals in ${categories.find((c) => c.id === selectedCategory)?.name || ''}`
            : 'All Meals'}
        </h1>

        {filteredProducts.length === 0 ? (
          <p>No meals found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                className="p-1 bg-white shadow-md rounded-lg hover:bg-gray-50 text-black justify-center text-center"
              >
                <Link href={`/meals/${product.id}`}>
                  <div className="relative h-40 w-40 mx-auto">
                    <Image
                      src={product.thumb}
                      alt={product.name}
                      width={150}
                      height={150}
                      unoptimized
                      className="object-cover rounded-lg hover:scale-105"
                    />
                  </div>
                  <p className="mt-2">{product.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Load More Button */}
        {selectedCategory === null && products.length > limit && (
          <div className="text-center mt-6">
            <button
              onClick={() => setLimit(limit + 25)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
