import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { useMenu } from "../../context/MenuContext";

type Props = {
  meal: {
    name: string;
    calories: number;
    ingredients: string[];
    instructions: string;
  };
  onSelectMeal: () => void;
};

const MealItem = ({ meal, onSelectMeal }: Props) => {
  const mealsContext = useMenu();

  //this code is reused...
  const handleMealSelect = () => {
    const { setCurrentMenuItem, currentMenuItem, setMenuItem } = mealsContext;
    setMenuItem({
      type: currentMenuItem,
      details: {
        name: meal.name,
        calories: meal.calories,
        ingredients: meal.ingredients,
        instructions: meal.instructions,
      },
    });
    setCurrentMenuItem(currentMenuItem);
    onSelectMeal();
  };

  return (
    <div
      className={
        "flex flex-row justify-between items-center bg-steel p-3 rounded-lg cursor-pointer w-full hover:bg-steel-medium transition-all duration-50 ease-in-out"
      }
      onClick={handleMealSelect}
    >
      <div className={"flex gap-2 "}>
        <h1 className={"text-lg"}>{meal.name}</h1>
        {meal.calories !== 0 && (
          <h2 className={"text-lg text-gray-400"}>{meal.calories} kcal</h2>
        )}
      </div>
      <div className={"text-gray-400"}>
        <FontAwesomeIcon icon={faAngleRight} width={10} />
      </div>
    </div>
  );
};

export default MealItem;
