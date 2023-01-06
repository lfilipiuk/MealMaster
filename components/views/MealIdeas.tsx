import React from "react";
import BackButton from "../ui/buttons/BackButton";
import { MealActions } from "../../utils/constants";
import { useSteps } from "../../context/StepContext";
import { useChef } from "../../context/ChefContext";
import MealItem from "../meals/MealItem";
import ForwardButton from "../ui/buttons/ForwardButton";

const MealIdeas = () => {
  const { setCurrentStep } = useSteps();
  const { searchValue, mealIdeas } = useChef();

  return (
    <div>
      <div className={"flex flex-row items-center gap-2"}>
        <BackButton
          onClick={() => setCurrentStep(MealActions.CREATE_AI_MEAL)}
        />
        <h1
          className={"font-bold text-3xl"}
        >{`Meal ideas for “${searchValue}”`}</h1>
      </div>

      <div className={"flex flex-col gap-3 mt-5"}>
        {mealIdeas.map((meal) => (
          <MealItem
            key={meal.name}
            name={meal.name}
            kcal={meal.calories}
            onSelectMeal={() => {}}
          />
        ))}
      </div>
      <hr className="my-8 w-full h-0.5 bg-gray-300 rounded" />

      <div className={"text-lg flex flex-col gap-4"}>
        <button
          className={
            "border-2 shadow-lg p-2 block w-full text-left rounded-lg flex items-center justify-between"
          }
        >
          Show other recipes
          <ForwardButton onClick={() => {}} />
        </button>

        <button
          onClick={() => {
            setCurrentStep(MealActions.CREATE_AI_MEAL);
          }}
          className={
            "border-2 shadow-lg p-2 block w-full text-left rounded-lg flex items-center gap-2"
          }
        >
          <BackButton onClick={() => {}} />
          Change search
        </button>
      </div>
    </div>
  );
};

export default MealIdeas;
