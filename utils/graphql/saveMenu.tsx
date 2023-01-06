export const SAVE_MENU_MUTATION = `mutation saveDay($userId: String!, $date: String!, $menu: JSON!) {
    createDay(data: {
        userId: $userId
        date: $date
        menu: $menu
    }) {
        data {
            id
            attributes {
                userId
                date
                menu
            }
        }
    }
}`;

export const FETCH_DAY = `query getDay($userId: String!) {
    days(filters: {userId: {eq: $userId }}) {
    data {
      id
      attributes {
        userId
        date
        menu
      }
    }
  }
}
`;
