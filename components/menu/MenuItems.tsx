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
  const { removeMenuItem, menuDate, setMenuItems, getMenuForDate, menuItems } =
    useMenu();
  const { modalOpen, setModalOpen, setCurrentStep } = useSteps();
  const { user, error: userError, isLoading } = useUser();

  function openModal() {
    setCurrentStep(MealActions.ADD_EDIT_MEAL);
    setModalOpen(true);
  }

  return (
    <>
      <ul className={"flex gap-7 flex-col my-5"}>
        {meals.map((menuItem: any) => (
          <li key={menuItem.type + menuItem.name}>
            <MenuItem
              type={menuItem.type}
              name={menuItem.name}
              kcal={menuItem.calories}
              icon={menuItem.icon as string}
              onClick={openModal}
              onRemove={() => removeMenuItem(menuItem.type)}
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
