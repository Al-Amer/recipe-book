"use client"

import { Category, getCategories } from "@/lib/queries";
import IconEdu from "../../../Icon/icon_Edu.png";
import { useEffect, useState } from "react";




export default function Categories () {
        // from line 4 at line 12 , it is only test , able to delete 
    // type ImageType = {
    //     id:number;
    //     Icon:StaticImageData;
    // }
    // const arr :ImageType[]=[];
    // for (let i :number=0 ; i < 20; i ++){
    //     arr.push({id:i, Icon:IconEdu} as ImageType);
    // }

      const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    useEffect(() => {
        fetch("/api/categories") 
        .then((res) => res.json())
        .then((data) => setCategories(data));
    }, []);

    return (
        <div className="justify-center ">
            <div className="justify-center border-2 border-solid border-indigo-500 m-5">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-6  m-5 border-2 border-solid border-white-500">
                    {categories.map((c) => (
                            <li key={c.id}>{c.name}</li>
                    ))}
                </div>
            </div>
        </div>

    )
}

	// <Image src={icaonAmer} alt={showFoots[2].name} onClick={(e)=>{setClickId(showFoots[2].id)}} className="border-2 border-solid border-red-200 h-60 w-60 m-5 rounded-full object-cover hover:object-none " key={4}/>
//     const [categories, setCategories] = useState<any[]>([]);
//     useEffect(() => {
//     // async function fetchCategories() {
//     //   const res = await fetch("/api/categories");
//     //   const data = await res.json();
//     //   console.log("Categories:", data);
//     //   setCategories(data);
   
//         const cat =  getCategories();
//         //  setCategories(cat:[{id:number, name:strig}]);
//         console.log(cat);
    
   
//     }
//     // fetchCategories();
//   , []);

        // <div className="justify-center ">
        //     <div className="justify-center border-2 border-solid border-indigo-500 m-5">
        //         <div className="grid grid-cols-3 md:grid-cols-5 gap-6  m-5 border-2 border-solid border-white-500">
        //             {arr.map((item) => (
        //                 <Image key={item.id} src={item.Icon} alt={`Icon ${item.id}`} className="h-auto max-w-full rounded-lg "/>
        //             )) }
        //         </div>
        //     </div>
        // </div>

            // {/* {arr.map((item) => (
            //             <Image key={item.id} src={item.Icon} alt={`Icon ${item.id}`} className="h-auto max-w-full rounded-lg "/>
            //         )) } */}

