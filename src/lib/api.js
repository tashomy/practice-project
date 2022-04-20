export async function getAllPeople() {
  let url = "https://swapi.dev/api/people/?format=json";
  let allOfThem = [];

  do {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(res.message || "Could not fetch People.");
    }

    url = data.next;
    allOfThem.push(...data.results);
  } while (url);

  return allOfThem;
}
