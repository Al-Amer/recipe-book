import Image,{ StaticImageData } from "next/image";
import IconAmer from "../../../Icon/icon_amer.png";
export default function Landing() {
    // from line 4 at line 12 , it is only test , able to delete 
    type ImageType = {
        id:number;
        Icon:StaticImageData;
    }
    const arr :ImageType[]=[];
    for (let i :number=0 ; i < 20; i ++){
        arr.push({id:i, Icon:IconAmer} as ImageType);
    }
  return (
    <div className="justify-center ">
        <div className="pb-5 mb-5 mt-5">
            <form className="max-w-md mx-auto">   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
        </div>
        <div className="justify-center border-2 border-solid border-indigo-500 m-5">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-6  m-5 border-2 border-solid border-white-500">
            {arr.map((item) => (
                <Image key={item.id} src={item.Icon} alt={`Icon ${item.id}`} className="h-auto max-w-full rounded-lg "/>
            )) }
        </div>
        </div>
    </div>
  )
}

// noch bearbeitung 
//<Image src={developer.imge} alt={developer.name} className='rounded-full h-40 w-40 object-contain'  /> 
// <div className="grid grid-cols-3 md:grid-cols-5 gap-4  m-5 border-2 border-solid border-white-500">