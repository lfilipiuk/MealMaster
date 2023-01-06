import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

type Props = {
  onAddCustomMeal: () => void;
};

const CustomMealButton = ({ onAddCustomMeal }: Props) => {
  return (
    <div
      onClick={onAddCustomMeal}
      className={
        "flex flex-row justify-between items-center bg-white p-3 rounded-lg border-gray-200 border shadow-xl cursor-pointer shadow-gray-200 hover:shadow-gray-300 transition-all duration-500 ease-in-out"
      }
    >
      <div className={"flex gap-1 items-center"}>
        <FontAwesomeIcon icon={faPlus} width={12} className={"text-gray-500"} />
        <h1 className={"text-lg"}>Add a new custom meal</h1>
      </div>
      <div className={"cursor-pointer text-gray-400 "}>
        <FontAwesomeIcon icon={faAngleRight} width={10} />
      </div>
    </div>
  );
};

export default CustomMealButton;
