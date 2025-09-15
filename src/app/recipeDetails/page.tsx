import Image,{ StaticImageData } from "next/image";
import IconFlorian from "../../../Icon/icon_Florian.png";

const productList : string[]=["egg","milk","hot water","vanela","baking paoder", "chess","apple"];


export default function RecipeDetails () {
    return (
        <div className="block border-2 border-solid border-white-500 m-5 p-5">
            <div className="flex border-2 border-solid border-blue-500 m-5 p-5">
                <Image src={IconFlorian} alt="Photo"className="h-auto w-150 max-w-full rounded-lg m-5"/>
                <div className="m-5 pl-5 border-2 border-solid border-blue-500">
                    <h3>Name</h3>
                    <p className="font-san h-70 overflow-y-auto mt-3 ">bla bla bla bla bla bla bla bla bla bla bla bla</p>
                </div>
            </div>
            <div className="border-2 border-solid border-pink-500 m-5 p-5">
                <h3>Zutaten :</h3>
                 <ul className="  m-3">
                    {productList.map((pro,key)=> {
                        return (<li key={key}>{pro}</li>)
                    })}
                </ul>
            </div>
           <div className="border-2 border-solid border-violet-500 m-5 p-5">
            <p className="border-solid border-blue-500 font-san h-70 overflow-y-auto mt-3">bla bla bla bla bla bla bla bla bla bla bla bla</p>
           </div>
        </div>
    )
}

// border-2 border-solid border-white-500 == to see the area of tag 
// <Image key={item.id} src={item.Icon} alt={`Icon ${item.id}`} className="h-auto max-w-full rounded-lg "/>
