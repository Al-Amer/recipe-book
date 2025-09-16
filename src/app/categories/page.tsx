"use client";
import { useEffect, useState } from "react";
import EduIcon from '../../../Icon/icon_Florian.png';
import Image from 'next/image';
import { text } from "stream/consumers";
// Icon Categories 
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
import Link from "next/link";

type Category = {
  id: number;
  name: string;
};
type Product={
  id:number;
  category_id: number;
  name:string;
  thumb: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [limit, setLimit] = useState(25);
  const IconCategories :string[] = [IconBeef, IconBreakfast,IconChicken,IconDessert,IconGoat,IconLamb, IconMiscellaneous, IconPasta, IconPork, IconSeafood, IconSide,IconStarter, IconVagen, IconVegetarian];

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
    fetch("api/meals").then((res)=> res.json()).then((data) => setProducts(data));
  }, []);
  // Filter products by selected category
 // Filter + limit logic
  const filteredProducts =
    selectedCategory === null
      ? products.slice(0, limit) // limit to 30 if no category is selected
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
              <li key={cat.id}
                onClick={() => {
                setSelectedCategory(cat.id);
                setLimit(25); // 25 it's the reset limit when changing category
                }}
                className={`cursor-pointer p-1 bg-white shadow-md rounded-lg hover:bg-gray-50 text-black justify-center text-center ${
                  selectedCategory === cat.id ? "border-2 border-blue-500" : ""
                }`} >
              <Image
                  // src={EduIcon}
                  src={IconCategories[(cat.id)-1]}
                  alt={cat.name}
                  className="border-1 border-solid border-red-200 h-40 w-65 object-cover hover:object-none rounded-lg"
                />
                {cat.name}
              </li>
          ))}
        </ul>
      )}
      </div>
      {/* Products */}
      <div className="mt-10">
        <h1 className="text-xl font-semibold mb-4">
          {selectedCategory
            ? `Meals in ${
                categories.find((c) => c.id === selectedCategory)?.name || ""
              }`
            : "All Meals"}
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
                <Link href={`/categories/${product.id}`}>
                  <div className="relative h-40 w-40 mx-auto">
                    <Image
                      src={product.thumb}
                      alt={product.name}
                      // fill 
                      width={150}
                      height={200} 
                      unoptimized // avoids slow Next.js optimization
                      className="object-cover rounded-lg hover:scale-125" // hover:object-none = ? make the picture unable to show (very big)
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

//     return (
//         <div className="justify-center ">
//             <div className="justify-center border-2 border-solid border-indigo-500 m-5">
//                 <div className="grid grid-cols-3 md:grid-cols-5 gap-6  m-5 border-2 border-solid border-white-500">
//                     {categories.map((c) => (
//                             <li key={c.id}>{c.name}</li>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
						// <Image src={icaonAmer} alt={showFoots[2].name} onClick={(e)=>{setClickId(showFoots[2].id)}} className="border-2 border-solid border-red-200 h-60 w-60 m-5 rounded-full object-cover hover:object-none " key={4}/>



  // table meals
  //   name text
  //   category_id number
  //   thumb sting url
  // <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
  //         {categories.map((cat) => (
  //           <li
  //             key={cat.id}
  //             className=" p-1 bg-white shadow-md rounded-lg hover:bg-gray-50 text-black justify-center text-center"  >
  //               <Image src={EduIcon} alt={cat.name} className="border-1 border-solid border-red-200 h-40 w-65 object-cover hover:object-none rounded-lg" key={cat.id}/>
  //             {cat.name}
  //           </li>
  //         ))}
  //       </ul>
  //     )}