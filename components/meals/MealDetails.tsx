import React from "react";
import { useMenu } from "../../context/MenuContext";
import BackButton from "../ui/buttons/BackButton";

type Props = {
  name: string;
  calories?: number;
  ingredients?: [
    {
      name: string;
      quantity: number;
      unit: string;
    }
  ];
  instructions?: string;
  button?: boolean;
};

const MealDetails = ({
  name,
  calories,
  instructions,
  ingredients,
  button = true,
}: Props) => {
  const { currentMenuItem } = useMenu();

  return (
    <div>
      <div className={"flex gap-1 items-center"}>
        <BackButton onClick={() => {}} />
        <h1 className={"text-2xl text-black font-bold"}>{name}</h1>
      </div>

      {calories !== 0 && (
        <h3 className={"text-gray-400 my-2"}>{calories} kcal</h3>
      )}

      {ingredients && ingredients?.length > 0 && (
        <>
          <h3 className={"my-2 text-lg font-semibold"}>Ingredients</h3>
          <ul className={"list-none list-inside text-lg"}>
            {ingredients?.map((ingredient) => (
              <li
                key={ingredient.name}
                className={"bg-gray-200 my-1 p-2 rounded-lg"}
              >
                {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              </li>
            ))}
          </ul>
        </>
      )}

      {instructions && (
        <>
          <h3 className={"text-lg mb-2 mt-3 font-semibold"}>Instructions</h3>
          <p className={"text-lg"}>
            {instructions.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </>
      )}

      {button && (
        <button
          className={
            "bg-green text-white font-semibold py-4 rounded mt-4 w-full text-xl hover:bg-green-dark transition-all duration-200 ease-in-out"
          }
        >
          Add as {currentMenuItem}
        </button>
      )}
    </div>
  );
};

export default MealDetails;
