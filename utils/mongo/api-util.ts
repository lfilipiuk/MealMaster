export async function getAllMeals() {
  const res = await fetch("http://localhost:3000/api/meals");
  const data = await res.json();
  console.log("data", data);
  return data;
}
