"use client";
import { useEffect, useState } from "react";
type Category = {
  id: number;
  name: string;
};
export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50"
            >
              {cat.name}
            </li>
          ))}
        </ul>
      )}
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
