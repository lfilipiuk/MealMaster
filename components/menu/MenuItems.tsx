import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { useMenu } from "../../context/MenuContext";
import { useSteps } from "../../context/StepContext";
import { MealActions } from "../../utils/constants";
import NewMenuItem from "./NewMenuItem";
import SaveMenuButton from "./SaveMenuButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMeal } from "../../context/MealContext";

type Props = {
  showCalories: boolean;
  meals: any;
};

const MenuItems = ({ showCalories, meals }: Props) => {
  const { removeMenuItem, setCurrentMenuItem } = useMenu();
  const { setStep, openModal } = useSteps();
  const { user, error: userError, isLoading } = useUser();
  const { setSelectedMeal } = useMeal();
  const { ADD_EDIT_MEAL, SHOW_MEAL_IN_MENU } = MealActions;

  const handleRemoveMenu = (e: MouseEvent, type: string) => {
    e.stopPropagation();
    removeMenuItem(type);
  };

  const handleEditMenu = (e: MouseEvent, type: string) => {
    e.stopPropagation();
    setCurrentMenuItem(type);
    setStep(ADD_EDIT_MEAL);
    openModal();
  };

  const handleMenuItemClick = (e: MouseEvent, type: string, name: string) => {
    e.stopPropagation();
    name !== "" ? setStep(SHOW_MEAL_IN_MENU) : setStep(ADD_EDIT_MEAL);

    const menuItem = meals.find((item: any) => item.type === type);
    setSelectedMeal(menuItem);

    setCurrentMenuItem(type);
    openModal();
  };

  return (
    <>
      <ul className={"flex gap-7 flex-col my-5"}>
        {meals.map((menuItem: any) => (
          <li key={menuItem.type + menuItem.name}>
            <MenuItem
              type={menuItem.type}
              name={menuItem.details.name}
              kcal={menuItem.details.calories}
              icon={menuItem.icon as string}
              onClick={handleMenuItemClick}
              onEdit={handleEditMenu}
              onRemove={handleRemoveMenu}
              showCalories={showCalories}
            />
          </li>
        ))}
      </ul>
      <NewMenuItem />
    </>
  );
};

export default MenuItems;
