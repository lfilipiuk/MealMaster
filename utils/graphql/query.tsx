export const MEAL_QUERY = `
query {
  meals {
    data {
      attributes {
        name
        calories
        ingredients
        instructions
      }
    }
  }
}
`;

export const GET_MEAL_QUERY = `
 query getMeal($name: String!) {
    meals(filters: {name: {eq: $name }}) {
    data {
      attributes {
        name
        calories
        ingredients
        instructions
      }
    }
  }
}
        `;
