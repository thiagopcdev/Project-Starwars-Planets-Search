export default async function StarWarsAPI() {
  const { results } = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((data) => data.json());
  return results;
}
