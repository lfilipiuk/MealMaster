export async function getAllMeals() {
  const apiUrl = process.env.API_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${apiUrl}/api/meals`);
    return await res.json();
  } catch (error: any) {
    if (error) console.error(`Error fetching meals: ${error.message}`);
    throw error;
  }
}
