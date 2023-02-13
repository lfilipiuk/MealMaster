import React from "react";
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
  const { setStep } = useSteps();
  const { setSelectedMeal } = useMeal();
  const { SHOW_MEAL_DETAILS, ADD_CUSTOM_MEAL, CREATE_AI_MEAL } = MealActions;

  //this is code which decides title of modal: either add or edit
  const meal = menuItems.find((meal) => meal.type === type);
  const editing = meal?.details.name !== "";
  const headerText = editing ? `Switch ${type} meal for...` : `Adding ${type}`;

  const selectMealHandler = (meal: any) => {
    setSelectedMeal(meal);
    setStep(SHOW_MEAL_DETAILS);
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
        <div className={"flex flex-col gap-4 max-h-80 overflow-y-auto my-2"}>
          {meals &&
            meals.map((meal: any) => (
              <MealItem
                key={meal._id}
                meal={meal.details}
                onSelectMeal={() => selectMealHandler(meal)}
              />
            ))}
        </div>
        <CustomMealButton onAddCustomMeal={() => setStep(ADD_CUSTOM_MEAL)} />

        <div>
          <Divider text={"OR"} />
          <OutOfMealIdeasButton onOutOfIdeas={() => setStep(CREATE_AI_MEAL)} />
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
