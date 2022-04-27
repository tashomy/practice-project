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

export async function getAllMovies() {
  let url = "https://swapi.dev/api/films/?format=json";
  let allOfThem = [];

  do {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(res.message || "Could not fetch Movies.");
    }

    url = data.next;
    allOfThem.push(...data.results);
  } while (url);
  return allOfThem;
}

export async function getAllSpaceships() {
  let url = "https://swapi.dev/api/starships/?format=json";
  let allOfThem = [];

  do {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(res.message || "Could not fetch Starships.");
    }

    url = data.next;
    allOfThem.push(...data.results);
  } while (url);
  return allOfThem;
}
export async function getAllVehicles() {
  let url = "https://swapi.dev/api/vehicles/?format=json";
  let allOfThem = [];

  do {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(res.message || "Could not fetch Starships.");
    }

    url = data.next;
    allOfThem.push(...data.results);
  } while (url);
  return allOfThem;
}
export async function getAllSpecies() {
  let url = "https://swapi.dev/api/species/?format=json";
  let allOfThem = [];

  do {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(res.message || "Could not fetch Starships.");
    }

    url = data.next;
    allOfThem.push(...data.results);
  } while (url);
  return allOfThem;
}
export async function getAllPlanets() {
  let url = "https://swapi.dev/api/planets/?format=json";
  let allOfThem = [];

  do {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(res.message || "Could not fetch Starships.");
    }

    url = data.next;
    allOfThem.push(...data.results);
  } while (url);
  return allOfThem;
}

export async function getPagePeople(pageNum = 1) {
  let url = `https://swapi.dev/api/people/?page=${pageNum}&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.message || "Could not fetch People from this page.");
  }

  return data.results;
}
export async function getPageSpaceships(pageNum = 1) {
  let url = `https://swapi.dev/api/starships/?page=${pageNum}&starship=3&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.message || "Could not fetch Starship from this page.");
  }

  return data.results;
}
export async function getPageVehicles(pageNum = 1) {
  let url = `https://swapi.dev/api/vehicles/?page=${pageNum}&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.message || "Could not fetch Starship from this page.");
  }

  return data.results;
}
export async function getPageSpecies(pageNum = 1) {
  let url = `https://swapi.dev/api/species/?page=${pageNum}&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.message || "Could not fetch Starship from this page.");
  }

  return data.results;
}
export async function getPagePlanets(pageNum = 1) {
  let url = `https://swapi.dev/api/planets/?page=${pageNum}&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(res.message || "Could not fetch Starship from this page.");
  }

  return data.results;
}
