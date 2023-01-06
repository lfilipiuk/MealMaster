import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { useMenu } from "../../context/MenuContext";

type Props = {
  name: string;
  kcal?: number;
  onSelectMeal: () => void;
};

const MealItem = ({ name, kcal = 0, onSelectMeal }: Props) => {
  const mealsContext = useMenu();

  //this code is reused...
  const handleMealSelect = () => {
    const { setCurrentMenuItem, currentMenuItem, setMenuItem } = mealsContext;
    setMenuItem({
      type: currentMenuItem,
      name,
      calories: kcal,
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
        <h1 className={"text-lg"}>{name}</h1>
        {kcal !== 0 && <h2 className={"text-lg text-gray-400"}>{kcal} kcal</h2>}
      </div>
      <div className={"text-gray-400"}>
        <FontAwesomeIcon icon={faAngleRight} width={10} />
      </div>
    </div>
  );
};

export default MealItem;
