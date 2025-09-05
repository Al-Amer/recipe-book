// FN to fetch data from API and store in PGSQL DB
const fetchData = async (url: string, startId: number, count: number) => {
	// Loop over given numbers to fetch data from API
	for (let i = startId; i < startId + count; i++) {
		// "calculate data and save in DB"

		// dynamically generate URL to fetch single meal from
		const res = await fetch(url + `${i}`);
		if (!res.ok) throw new Error("Falied to fetch data");
		const data = await res.json();
		// console.log(data);

		// Call FN to save Data in PGSQL DB

		// return data;
	}
};
export default fetchData;
