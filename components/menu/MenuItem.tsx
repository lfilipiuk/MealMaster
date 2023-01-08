import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faS, faPlus, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { library, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import MenuIcon from "./MenuIcon";
import { useMenu } from "../../context/MenuContext";
import { MealActions } from "../../utils/constants";
import { useSteps } from "../../context/StepContext";
library.add(faS as IconDefinition, faPlus as IconDefinition);

type Props = {
  type: string;
  name: string;
  kcal: number;
  icon: string;
  onClick: (e: any, type: string, name: string) => void;
  onEdit: (e: any, type: string, name: string) => void;
  onRemove: (e: any, type: string) => void;
  showCalories: boolean;
};

const MenuItem = ({
  type,
  name,
  kcal,
  icon,
  onEdit,
  onClick,
  onRemove,
  showCalories,
}: Props) => {
  //This will evaluate to true if name is undefined, null, or an empty string.
  const emptyMenuItem = !name;

  return (
    <div
      onClick={(e) => onClick(e, type, name)}
      className={
        "text-gray-600 bg-white h-28 rounded-lg py-2 px-4 font-primary shadow-lg shadow-gray-200 hover:shadow-gray-300 hover:text-black transition-all duration-500 ease-in-out cursor-pointer"
      }
    >
      <div className={"flex flex-col justify-between"}>
        <div className={"pointer-events-none"}>
          <MenuIcon icon={icon} active={!emptyMenuItem} />
        </div>

        <p
          className={
            "text-gray-400 font-proxima font-semibold text-sm uppercase tracking-wider pt-5"
          }
        >
          {type}
        </p>

        <div className={"flex justify-between items-end"}>
          <div className={"flex flex-row items-center gap-1 cursor-pointer"}>
            {emptyMenuItem ? (
              <>
                <FontAwesomeIcon icon={faPlus} width={12} />
                <h2 className={"text-center text-lg"}>Add {type}</h2>
              </>
            ) : (
              <>
                <h2 className={"text-lg"}>{name}</h2>
                {kcal !== 0 && showCalories && (
                  <h3 className={"text-lg text-gray-400"}>{kcal} kcal</h3>
                )}
              </>
            )}
          </div>

          <div className={"flex gap-2 items-center text-gray-400"}>
            {!emptyMenuItem && (
              <div
                className={
                  "pb-2 cursor-pointer hover:text-gray-600 transition-all duration-100 ease-in-out"
                }
                onClick={(e) => onEdit(e, type, name)}
              >
                <FontAwesomeIcon icon={faArrowsRotate} width={15} />
              </div>
            )}

            <div
              className={
                "pb-2 cursor-pointer hover:text-gray-600 transition-all duration-100 ease-in-out"
              }
              onClick={(e) => onRemove(e, type)}
              datatype={type}
            >
              <FontAwesomeIcon icon={faTrashCan} width={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
