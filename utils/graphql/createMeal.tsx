export const CREATE_MEAL_MUTATION = `
mutation createMeal($name: String!, $calories: Int!, $created: String!, $instructions: String!, $ingredients: JSON!) {
  createMeal(data: { name: $name, calories: $calories, created: $created, instructions: $instructions, ingredients: $ingredients }) {
    data {
      id
      attributes {
          name
          calories
          created
          instructions
          ingredients
      }
    }
  }
}
`;
