import Image from "next/image";
import iconFlorian from "../../../Icon/icon_Florian.png";
import iconEdu from "../../../Icon/icon_Edu.png";
import icaonAmer from "../../../Icon/icon_amer.png";

export default function About() {
	const developers: {
		id: number;
		imge: string;
		name: string;
		link: string;
		profie: string;
		aboutText: string;
	}[] = [
		{
			id: 0,
			imge: iconFlorian,
			name: "Florian",
			link: "https://github.com/GruFRe",
			profie: "Software Developer",
			aboutText:
				"Placeholder text and picture for now because of my endless creativity",
		},
		{
			id: 1,
			imge: iconEdu,
			name: "Edu",
			link: "Edugithub",
			profie: "Software Developer",
			aboutText:
				"With a strong foundation in the social sector as a care worker and office administrator, I bring empathy, organization, and a people-first mindset into the world of technology. Now transitioning into tech, I’m combining my experience in support and coordination with a passion for building meaningful digital solutions.",
		},
		{
			id: 2,
			imge: icaonAmer,
			name: "Amer",
			link: "https://github.com/Al-Amer",
			profie: "Software Developer",
			aboutText:
				"Software Engineer with very good knowledge of HTML5, JavaScript and SQL as well as successfully applied Responsive Designs, Clean Code: Clear code, without bugs.",
		},
	];

	return (
		<div className="flex items-start justify-center border-2 border-solid border-indigo-200 rounded-xl bg-sky-200 m-8 p-8 dark:bg-sky-800 dark:text-white flex-wrap">
			{developers.map((developer) => {
				return (
					<div
						key={developer.id}
						className="group flex flex-col justify-center text-center border-2 border-solid border-indigo-500 
                                   rounded-xl m-4 p-4 w-80 bg-blue-200 transition-transform duration-300 
                                   hover:scale-105"
					>
						<div className="flex justify-center">
							<Image
								src={developer.imge}
								alt={developer.name}
								className="rounded-full h-40 w-40 object-contain 
                                           transition-transform duration-300 
                                           group-hover:scale-110 group-hover:ring-4 group-hover:ring-indigo-400"
							/>
						</div>

						<h3 className="font-serif text-xl mt-3">{developer.name}</h3>
						<p className="font-mono mt-3">{developer.profie}</p>
						<p className="font-san h-70 overflow-y-auto mt-3">
							{developer.aboutText}
						</p>

						{/* Social icons can be added here if needed */}
					</div>
				);
			})}
		</div>
	);
}
