import React, { useEffect, useState } from "react";
import MealItem from "../meals/MealItem";
import CustomMealButton from "../ui/buttons/CustomMealButton";
import OutOfMealIdeasButton from "../ui/buttons/OutOfMealIdeasButton";
import Divider from "../ui/other/Divider";
import { useMenu } from "../../context/MenuContext";
import { useSteps } from "../../context/StepContext";
import { MealActions } from "../../utils/constants";
import { useMeal } from "../../context/MealContext";

type Props = {
  type: string;
  meals: any;
};

const AddMeal = ({ type, meals }: Props) => {
  const { menuItems } = useMenu();
  const { setModalOpen, setCurrentStep } = useSteps();
  const { setSelectedMeal } = useMeal();

  //this is code which decides title of modal: either add or edit
  const meal = menuItems.find((meal) => meal.type === type);
  const editing = meal?.details.name !== "";
  const headerText = editing ? `Switch ${type} meal for...` : `Adding ${type}`;

  const selectMealHandler = (meal: any) => {
    setSelectedMeal(meal);
    setCurrentStep(MealActions.SHOW_MEAL_DETAILS);
  };

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
                meal={meal.details}
                onSelectMeal={() => selectMealHandler(meal)}
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
