import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { useMenu } from "../../context/MenuContext";
import { useSteps } from "../../context/StepContext";
import { MealActions } from "../../utils/constants";
import NewMenuItem from "./NewMenuItem";
import SaveMenuButton from "./SaveMenuButton";
import { useUser } from "@auth0/nextjs-auth0/client";

type Props = {
  showCalories: boolean;
  meals: any;
};

const MenuItems = ({ showCalories, meals }: Props) => {
  const { removeMenuItem, setCurrentMenuItem } = useMenu();
  const { setModalOpen, setCurrentStep } = useSteps();
  const { user, error: userError, isLoading } = useUser();

  const handleAddEditMenu = (e: any) => {
    e.stopPropagation();
    setCurrentStep(MealActions.ADD_EDIT_MEAL);
    setModalOpen(true);
  };

  const handleRemoveMenu = (e: MouseEvent, type: string) => {
    e.stopPropagation();
    removeMenuItem(type);
  };

  const handleEditMenu = (e: MouseEvent, type: string) => {
    e.stopPropagation();
    setCurrentStep(MealActions.ADD_EDIT_MEAL);
    setCurrentMenuItem(type);
    setModalOpen(true);
  };

  const handleMenuItemClick = (e: MouseEvent, type: string, name: string) => {
    e.stopPropagation();
    name !== ""
      ? setCurrentStep(MealActions.SHOW_MEAL)
      : setCurrentStep(MealActions.ADD_EDIT_MEAL);
    setCurrentMenuItem(type);
    setModalOpen(true);
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
      {user && <SaveMenuButton />}
    </>
  );
};

export default MenuItems;
