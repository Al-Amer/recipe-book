"use client";
import React, { useState , useEffect} from 'react'
import Image from "next/image";

type Product = {
  id: number;
  category_id: number;
  name: string;
  thumb: string;
  // add other fields from DB if available, like description, instructions, etc.
};

export default function RecipeDetails({ params }: { params: { id: string } }) {
    const [product, setProduct] =useState<Product | null>(null);
    useEffect(() => {
    fetch(`/api/meals/${params.id}`) 
        .then((res) => res.json())
        .then((data) => setProduct(data));
        }, [params.id]);

        if (!product) {
            return <p className="p-6">Loading...</p>;
        }
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex gap-6">
                    <Image
                    src={product.thumb}
                    alt={product.name}
                    width={300}
                    height={300}
                    unoptimized
                    className="rounded-lg object-cover"
                    />
                    <div>
                    <h2 className="text-2xl font-bold">{product.name}</h2>
                    <p className="mt-3 text-gray-600">
                        Category ID: {product.category_id}
                    </p>
                    </div>
                </div>

                {/* Example Ingredients */}
                <div className="mt-8">
                    <h3 className="font-semibold text-lg">Ingredients:</h3>
                    <ul className="list-disc list-inside mt-2">
                    <li>Egg</li>
                    <li>Milk</li>
                    <li>Hot water</li>
                    </ul>
                </div>

                <div className="mt-8">
                    <h3 className="font-semibold text-lg">Instructions:</h3>
                    <p className="mt-2 text-gray-700">
                    Here you can load cooking instructions from your DB if available.
                    </p>
                </div>
            </div>
        )
}
