import React from "react";
import { useSteps } from "../../../context/StepContext";
import { useMenu } from "../../../context/MenuContext";
import AddMeal from "../../views/AddMeal";
import CustomMeal from "../../views/CustomMeal";
import { MealActions } from "../../../utils/constants";
import Summary from "../../views/Summary";
import MeetAI from "../../views/MeetAI";
import MealIdeas from "../../views/MealIdeas";

const ModalContent = () => {
  const { currentStep } = useSteps();
  const { currentMenuItem } = useMenu();

  let content;

  switch (currentStep) {
    case MealActions.ADD_EDIT_MEAL:
      content = <AddMeal type={currentMenuItem} />;
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
    default:
      content = <div>Nothing to show</div>;
  }

  return content;
};

export default ModalContent;
