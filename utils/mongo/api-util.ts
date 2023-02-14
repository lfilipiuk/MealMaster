import axios from "axios";

export async function getAllMeals() {
  const apiUrl = process.env.API_URL || "http://localhost:3000";
  try {
    const response = await axios.get(`${apiUrl}/api/meals`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching meals: ${error.message}`);
    throw error;
  }
}
