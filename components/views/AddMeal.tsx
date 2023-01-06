import React, { useEffect, useState } from "react";
import MealItem from "../meals/MealItem";
import CustomMealButton from "../ui/buttons/CustomMealButton";

import OutOfMealIdeasButton from "../ui/buttons/OutOfMealIdeasButton";
import Divider from "../ui/other/Divider";
import { useMenu } from "../../context/MenuContext";
import { useSteps } from "../../context/StepContext";
import { MealActions } from "../../utils/constants";
import { useQuery } from "urql";
import { MEAL_QUERY } from "../../utils/graphql/query";
import axios from "axios";

type Props = {
  type: string;
};

const AddMeal = ({ type }: Props) => {
  const { menuItems } = useMenu();
  const { setModalOpen, setCurrentStep } = useSteps();

  //TODO - remove fetching products using graphQL
  // //Fetch products from strapi
  // const [results] = useQuery({ query: MEAL_QUERY });
  // const { data, fetching, error } = results;
  //
  // //check for the data coming in
  // if (fetching) return <p>Loading...</p>;
  // if (error) return <p>Oh no... {error.message}</p>;
  // const meals = data.meals.data;

  const [meals, setMeals] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/meals");
      const data = await res.json();
      console.log("data", data);
      setMeals(data);
    }

    fetchData();
  }, []);

  //this is code which decides title of modal: either add or edit
  const meal = menuItems.find((meal) => meal.type === type);
  const editing = meal?.name !== "";
  const headerText = editing ? `Switch ${type} meal for...` : `Adding ${type}`;

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className={"font-proxima"}>
      <h1 className={"font-bold text-3xl"}>{headerText}</h1>
      <h4
        className={
          "text-gray-400 font-proxima font-semibold text-sm uppercase tracking-wider py-4"
        }
      >
        YOUR MEALS
      </h4>

      <div className={"flex flex-col justify-evenly"}>
        <div className={"flex flex-col gap-4"}>
          {meals &&
            meals.map((meal: any) => (
              <MealItem
                key={meal._id}
                name={meal.name}
                kcal={meal.calories}
                onSelectMeal={closeModal}
              />
            ))}
          <CustomMealButton
            onAddCustomMeal={() => setCurrentStep(MealActions.ADD_CUSTOM_MEAL)}
          />
        </div>

        <div>
          <Divider text={"OR"} />
          <OutOfMealIdeasButton
            onOutOfIdeas={() => setCurrentStep(MealActions.CREATE_AI_MEAL)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddMeal;