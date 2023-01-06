import React from "react";
import { useQuery } from "urql";
import { GET_MEAL_QUERY } from "../../utils/graphql/query";

type Props = {
  name: string;
};

const MealDetails = ({ name }: Props) => {
  // //Fetch products from strapi
  // const [results] = useQuery({
  //   query: GET_MEAL_QUERY,
  //   variables: { name: query.name },
  // });
  //
  // const { data, fetching, error } = results;
  // if (fetching) return <p>Loading...</p>;
  // if (error) return <p>Oh no... {error.message}</p>;
  //
  // // Destructure data
  // const { title, description, image } = data.products.data[0].attributes;

  return <div></div>;
};

export default MealDetails;
