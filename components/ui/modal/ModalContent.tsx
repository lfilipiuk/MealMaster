import React from "react";
import { useSteps } from "../../../context/StepContext";
import { useMenu } from "../../../context/MenuContext";
import AddMeal from "../../views/AddMeal";
import CustomMeal from "../../views/CustomMeal";
import { MealActions } from "../../../utils/constants";
import Summary from "../../views/Summary";
import MeetAI from "../../views/MeetAI";
import MealIdeas from "../../views/MealIdeas";
import MealDetails from "../../meals/MealDetails";

type Props = {
  meals: any;
  menu: any;
};

const ModalContent = ({ meals, menu }: Props) => {
  const { currentStep } = useSteps();
  const { currentMenuItem } = useMenu();

  let content;

  switch (currentStep) {
    case MealActions.ADD_EDIT_MEAL:
      content = <AddMeal type={currentMenuItem} meals={meals} />;
      break;
    case MealActions.ADD_CUSTOM_MEAL:
      content = <CustomMeal />;
      break;
    case MealActions.CREATE_AI_MEAL:
      content = <MeetAI />;
      break;
    case MealActions.SUMMARY:
      content = <Summary />;
      break;
    case MealActions.AI_MEAL_IDEAS:
      content = <MealIdeas />;
      break;
    case MealActions.SHOW_MEAL:
      const meal = menu.find((meal: any) => meal.type === currentMenuItem);
      const { name, calories, instructions, ingredients } = meal.details;
      content = (
        <MealDetails
          name={name}
          calories={calories}
          ingredients={ingredients}
          instructions={instructions}
        />
      );
      break;
    default:
      content = <div>Nothing to show</div>;
  }

  return content;
};

export default ModalContent;
