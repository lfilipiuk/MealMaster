export async function getAllMeals() {
  //FIXME: localhost:3000 should be replaced with the actual URL of the API from environment variables
  const apiUrl = process.env.API_URL || "http://localhost:3000";
  const res = await fetch(`${apiUrl}/api/meals`);
  return await res.json();
}
