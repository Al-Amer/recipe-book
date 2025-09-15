"use client"
import iconFlorian from '../../Icon/icon_Florian.png';
import iconEdu from '../../Icon/icon_Edu.png';
import icaonAmer from '../../Icon/icon_amer.png';
import Image from 'next/image';
// import ImageButton from '@fdmg/ts-react-image-button';
import { useState } from 'react';

export default function Home() {
	const showFoots: {  id:number;
						imge: string;
						name:string; 
						link:string;
						profie: string;
						aboutText : string; }[]= [
  	{id:0,imge:iconFlorian,name:"Florian",link:"https://github.com/GruFRe",profie:"Software Developer",aboutText:"A Junior Software Engineer actively building foundational skills in Python, JavaScript, C#, and Full-Stack. My background as an IT Systems Electronics Technician and Office Management Assistant (with SAP Business One) has honed my problem-solving and user-centric approach. Beyond my career, 16 years of dedicated family care alongside work and school instilled exceptional responsibility and a solution-oriented drive. I'm eager to apply these diverse experiences and developing technical skills to impactful IT projects."},
	{id:1,imge:iconEdu,name:"Edu",link:"Edugithub",profie:"Software Developer",aboutText:"With a strong foundation in the social sector as a care worker and office administrator, I bring empathy, organization, and a people-first mindset into the world of technology. Now transitioning into tech, I’m combining my experience in support and coordination with a passion for building meaningful digital solutions."},
  	{id:2,imge:icaonAmer,name:"Amer",link:"https://github.com/Al-Amer",profie:"Software Developer",aboutText:"With a strong foundation in the social sector as a care worker and office administrator, I bring empathy, organization, and a people-first mindset into the world of technology. Now transitioning into tech, I’m combining my experience in support and coordination with a passion for building meaningful digital solutions."}
	];
	const [clickId, setClickId] = useState(-1);
	if (clickId > -1){
		console.log(clickId);
	}

	// const  clickHandler=((e:number)=> {
	// 	setClickId(e)
	// 	console.log(`image : ${e}`)
	// }
	// );

	return (
		<div className="block items-start bg-sky-200 m-8 p-8 dark:bg-sky-800 dark:text-white border-2 border-solid border-black-200">
			<div className="block flex flex-col justify-center text-center border-2 border-solid border-black-200">
				<h1 className="font-serif text-3xl m-3 p-7">RECIPE BOOK</h1>
				<p className="p-4 m-4 border-2 border-solid border-red-200">A healthy diet involves eating a wide variety of nutrient-rich foods, including fruits, vegetables, 
					whole grains, lean proteins, and healthy fats, to provide energy, support bodily functions, 
					and prevent diseases like heart disease, diabetes, and certain cancers. It's important to limit salt, sugar, 
					and unhealthy fats while drinking plenty of water to maintain overall health, boost immunity, and improve 
					brain function.</p>
				<blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white p-4 m-4 border-2 border-solid border-yellow-200">
    				<p>"Food is the fuel that keeps us running throughout the day, and it also supports the body’s metabolic 
						process and ensures we remain healthy. Children need to understand the importance of food to build healthy 
						eating habits in the long term. They also need to learn that the body needs energy from healthy food to conduct day-to-day activities. 
						Writing an essay on food in English is a great way to get kids acquainted with important information on the different food categories and
						 their role in our diets. In this blog, we have put together a few examples of essays on food for classes 1, 2 & 3 that are easy to understand and 
						 informative."</p>
				</blockquote>
			</div>
			<h1 className="text-center"> Our Food</h1>
			<div className=" justify-center flex border-2 border-solid border-green-200">
				{/* first Option */}
				<div className='block border-2 border-solid border-red-200 m-10 p-10'>
					{showFoots.map(food=> {
						return(
							<div className='flex h-100 w-150 border-2 border-solid border-red-200' key={food.id} >
								<Image src={food.imge} alt={food.name} className="border-2 border-solid border-red-200 h-60 w-60 m-5 hover:object-none " key={food.id}/>
								<div className="border-2 border-solid border-red-200 m-5 ">
								<h3 className='text-center'>{food.name}</h3>
								<p className='overflow-y-auto mt-3 m-4 b-2 h-60'>{food.aboutText}</p>
							</div>
							</div>
						);
					})}
				</div>
				</div>
				<div className=" justify-center flex border-2 border-solid border-green-200">
				{/* second option */}
				<div className='block border-2 border-solid border-red-200 m-10 p-10'>
					<div className='flex h-100 w-150 border-2 border-solid border-red-200' key={showFoots[0].id} >
						<Image src={showFoots[0].imge} alt={showFoots[0].name} className="border-2 border-solid border-red-200 h-60 w-60 m-5 rounded-xl hover:object-none " key={showFoots[0].id}/>
						<div className="border-2 border-solid border-red-200 m-5 ">
							<h3 className='text-center'>{showFoots[0].name}</h3>
							<p className='overflow-y-auto mt-3 m-4 b-2 h-60'>{showFoots[0].aboutText}</p>
						</div>
					</div>
					<div className='flex h-100 w-150 border-2 border-solid border-red-200' key={showFoots[1].id} >
						<div className="border-2 border-solid border-red-200 m-5 ">
							<h3 className='text-center'>{showFoots[1].name}</h3>
							<p className='overflow-y-auto mt-3 m-4 b-2 h-60'>{showFoots[1].aboutText}</p>
						</div>
						<Image src={showFoots[1].imge} alt={showFoots[1].name} className="border-2 border-solid border-red-200 h-60 w-60 m-5 hover:object-none " key={showFoots[1].id}/>
					</div>
					<div className='flex h-100 w-150 border-2 border-solid border-red-200' key={showFoots[2].id} >
						<Image src={showFoots[2].imge} alt={showFoots[2].name} className="border-2 border-solid border-red-200 h-60 w-60 m-5 rounded-full object-cover hover:object-none " key={showFoots[2].id}/>
						<div className="border-2 border-solid border-red-200 m-5 ">
							<h3 className='text-center'>{showFoots[2].name}</h3>
							<p className='overflow-y-auto mt-3 m-4 b-2 h-60'>{showFoots[2].aboutText}</p>
						</div>
					</div>
					<h1 className='bg-red-400 text-white text-3xl'>Test</h1>
					<div className='flex h-100 w-150 border-2 border-solid border-red-200' key={3} >
						<Image src={icaonAmer} alt={showFoots[2].name}  className="border-2 border-solid border-red-200 h-60 w-60 m-5 rounded-full object-cover hover:object-none " key={3}/>
						<div className="border-2 border-solid border-red-200 m-5 ">
							<h3 className='text-center'>{showFoots[2].name}</h3>
							<p className='overflow-y-auto mt-3 m-4 b-2 h-60'>{showFoots[2].aboutText}</p>
						</div>
					</div>
					<div className='flex h-100 w-150 border-2 border-solid border-red-200' key={4} >
						<Image src={icaonAmer} alt={showFoots[2].name} onClick={(e)=>{setClickId(showFoots[2].id)}} className="border-2 border-solid border-red-200 h-60 w-60 m-5 rounded-full object-cover hover:object-none " key={4}/>
						<div className="border-2 border-solid border-red-200 m-5 ">
							<h3 className='text-center'>{showFoots[2].name}</h3>
							<p className='overflow-y-auto mt-3 m-4 b-2 h-60'>{showFoots[2].aboutText}</p>
						</div>
					</div>

				</div>
				
			</div>		

				

				

		
		</div>
	);
}

// hover:scale-125

// {showFoots.map((food)=>(
// 									<div className="hidden duration-700 ease-in-out" data-carousel-item key={food.id}>
// 										<Image src={food.imge} alt={food.name} />
// 									</div>
// 							))}
// must pakage instlling 
{/* <div id="custom-controls-gallery" className="relative w-full border-2 border-solid border-green-200" data-carousel="slide">
					<div className="relative h-56 overflow-hidden rounded-lg md:h-96 border-2 border-solid border-yellow-200">
						<div className="hidden duration-700 ease-in-out border-2 border-solid border-red-200" data-carousel-item>
							<Image src={showFoots[0].imge} className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 border-2 border-solid border-green-200" alt={showFoots[0].name}/>
						</div>
						<div className="hidden duration-700 ease-in-out  border-2 border-solid border-white" data-carousel-item="active">
							<Image src={showFoots[1].imge} className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={showFoots[1].name}/>
						</div>
						<div className="hidden duration-700 ease-in-out" data-carousel-item>
							<Image src={showFoots[2].imge} className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={showFoots[2].imge}/>
						</div>
						<div className="hidden duration-700 ease-in-out" data-carousel-item>
							<Image src={showFoots[0].imge} className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={showFoots[0].imge}/>
						</div>
						<div className="hidden duration-700 ease-in-out" data-carousel-item>
							<Image src={showFoots[1].imge} className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt={showFoots[1].imge}/>
						</div>
					</div>
					<div className="flex justify-center items-center pt-4">
						<button type="button" className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
							<span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
								<svg className="rtl:rotate-180 w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 14 10">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
								</svg>
								<span className="sr-only">Previous</span>
							</span>
						</button>
						<button type="button" className="flex justify-center items-center h-full cursor-pointer group focus:outline-none" data-carousel-next>
							<span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
								<svg className="rtl:rotate-180 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
								</svg>
								<span className="sr-only">Next</span>
							</span>
						</button>
					</div>
				</div> */}