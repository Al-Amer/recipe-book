// fetch meals
// fetch ingredients
// to save in DB

const fetchData = async () => {
	const res = await fetch(
		"https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}"
	);
	const data = await res.json();
	console.log(data);
};

// import fetch from "node-fetch";
// async function fetchMeals(startId, count) {
//   const meals = [];
//   for (let id = startId; id < startId + count; id++) {
//     const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
//     const data = await res.json();
//     if (data.meals) {
//       meals.push(data.meals[0]);
//     }
//   }
//   return meals;
// }
// fetchMeals(52772, 100).then(meals => {
//   console.log(`Fetched ${meals.length} meals`);
//   console.log(meals.map(m => m.strMeal));
// });
