export async function getAllMeals() {
  //FIXME: localhost:3000 should be replaced with the actual URL of the API from environment variables
  const res = await fetch("http://localhost:3000/api/meals");
  return await res.json();
}
