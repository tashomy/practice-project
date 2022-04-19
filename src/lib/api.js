export async function getAllPeople() {
  const response = await fetch("https://swapi.dev/api/people/?format=json");
  const data = await response.json();
  console.log(data);
  //   const docs = data.docs;
  if (!response.ok) {
    throw new Error(response.message || "Could not fetch People.");
  }

  const transformedPeople = [];

  for (const key in data.results) {
    const personObj = {
      name: data.results[key].name,
      birth_year: data.results[key].birth_year,
      gender: data.results[key].gender,
      count: data.count,
    };

    transformedPeople.push(personObj);
  }
  //   return transformedPeople;
  return transformedPeople;
}
