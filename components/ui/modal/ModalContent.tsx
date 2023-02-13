import React, { useEffect } from "react";
import { useSteps } from "../../../context/StepContext";
import { useMenu } from "../../../context/MenuContext";
import AddMeal from "../../views/AddMeal";
import CustomMeal from "../../views/CustomMeal";
import { MealActions } from "../../../utils/constants";
import Summary from "../../views/Summary";
import MeetAI from "../../views/MeetAI";
import MealIdeas from "../../views/MealIdeas";
import MealDetails from "../../meals/MealDetails";
import { useMeal } from "../../../context/MealContext";

type Props = {
  meals: any;
  menu: any;
};

//ModalContent can be used to store selected meal details

const ModalContent = ({ meals, menu }: Props) => {
  const { currentStep, setCurrentStep, setModalOpen } = useSteps();
  const { currentMenuItem } = useMenu();
  const { selectedMeal } = useMeal();

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
    case MealActions.SHOW_MEAL_IN_MENU:
      content = (
        <MealDetails
          name={selectedMeal.details.name}
          calories={selectedMeal.details.calories}
          ingredients={selectedMeal.details.ingredients as any}
          instructions={selectedMeal.details.instructions}
        />
      );
      break;
    case MealActions.SHOW_MEAL_DETAILS:
      content = (
        <MealDetails
          name={selectedMeal.details.name}
          calories={selectedMeal.details.calories}
          ingredients={selectedMeal.details.ingredients as any}
          instructions={selectedMeal.details.instructions}
          button={true}
        />
      );
      break;
    default:
      content = <div>Nothing to show</div>;
  }

  return content;
};

export default ModalContent;
