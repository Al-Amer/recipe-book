"use client";
import { useEffect, useState } from "react";
import EduIcon from '../../../Icon/icon_Florian.png'
import Image from 'next/image';
import { text } from "stream/consumers";
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
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
    fetch("api/meals").then((res)=> res.json()).then((data) => setProducts(data));
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div>
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className=" p-1 bg-white shadow-md rounded-lg hover:bg-gray-50 text-black justify-center text-center"  >
                <Image src={EduIcon} alt={cat.name} className="border-1 border-solid border-red-200 h-40 w-65 object-cover hover:object-none rounded-lg" key={cat.id}/>

              {cat.name}
            </li>
          ))}
        </ul>
      )}
      </div>
      <div>
        
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