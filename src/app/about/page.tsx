// import of self wriiten Fn to fetch Data from API
import fetchData from "@/lib/fetchdata";

const About = () => {
	// URl to fetch from
	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;
	const startId = 52772;
	const counter = 10;
	// Call fetch FN with URL Variable
	const data = fetchData(url, startId, counter);

	return (
		<>
			<h1>About Us</h1>
		</>
	);
};

export default About;

// // Edu idea for node/JS

// import fetch from "node-fetch";
// import fs from "fs";

//// FN Definition -> startID, Count
// async function fetchMeals(startId, count) {
//   const meals = [];

// Loop
//   for (let id = startId; id < startId + count; id++) {
//     const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
//     try {
//       const res = await fetch(url);
//       const data = await res.json();
//       if (data.meals) {
//         meals.push(data.meals[0]); // store the meal object
//         console.log(`:weißes_häkchen: Found: ${data.meals[0].strMeal}`);
//       } else {
//         console.log(`:x: No meal found for ID ${id}`);
//       }
//     } catch (err) {
//       console.error(`:warnung: Error fetching ID ${id}`, err);
//     }
//   }
//   // Save results
//   fs.writeFileSync("meals.json", JSON.stringify(meals, null, 2));
//   console.log(`\n:tada: Saved ${meals.length} meals to meals.json`);
// }
// // Fetch 100 recipes starting from ID 52772
// fetchMeals(52772, 100);
