import React, { useState } from "react";
import { useMenu } from "../../context/MenuContext";
import MenuIcon from "./MenuIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

const availableMenuItems = [
  "Breakfast",
  "Snack",
  "Lunch",
  "Snack II",
  "Dinner",
  "Other",
];

const availableMenuIcons = ["Croissant", "Donut", "Eggs", "Turkey", "Salad"];

type Props = {
  onAdd: () => void;
};

const NewMenuItemCard = ({ onAdd }: Props) => {
  const [selectedMenuIcon, setSelectedMenuIcon] = useState("Croissant");
  const { menuItems, addMenuItem } = useMenu();

  const filteredMenuItems = availableMenuItems.filter((item) => {
    // Check if the item is not present in the menuItems array
    return !menuItems.some((menuItem) => menuItem.type === item);
  });

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    filteredMenuItems[0]
  );

  const handleMealAdd = () => {
    setSelectedMenuIcon(availableMenuIcons[0]);
    setSelectedMenuItem(filteredMenuItems[0]);
    addMenuItem({
      type: selectedMenuItem,
      name: "",
      calories: 0,
      icon: selectedMenuIcon,
    });

    onAdd();
  };

  const handleMealCancel = () => {
    setSelectedMenuIcon(availableMenuIcons[0]);
    setSelectedMenuItem(filteredMenuItems[0]);
    onAdd();
  };

  return (
    <div>
      <div
        className={"bg-white h-28 rounded-lg py-2 px-4 font-primary shadow-lg"}
      >
        <p
          className={
            "text-gray-400 font-semibold text-sm uppercase tracking-wider"
          }
        >
          SELECT MEAL TYPE & ICON
        </p>
        <div className={"flex flex-row gap-4 py-2"}>
          {filteredMenuItems.map((item) => (
            <h1
              key={item}
              onClick={() => setSelectedMenuItem(item)}
              className={`text-xl cursor-pointer ${
                selectedMenuItem === item ? "text-black" : "text-gray-400"
              }`}
            >
              {item}
            </h1>
          ))}
        </div>
        <div className={"flex flex-row gap-2 py-1"}>
          {availableMenuIcons.map((item) => (
            <div
              key={item}
              className={"cursor-pointer"}
              onClick={() => setSelectedMenuIcon(item)}
            >
              <MenuIcon icon={item} active={selectedMenuIcon === item} />
            </div>
          ))}
        </div>
      </div>
      <div className={"flex gap-2 py-4 justify-center"}>
        <button
          onClick={handleMealAdd}
          className={
            "bg-green w-10 h-10 rounded-lg flex justify-center items-center hover:bg-green-dark transition-all duration-300 ease-in-out"
          }
        >
          <FontAwesomeIcon icon={faCheck} width={20} className={"text-white"} />
        </button>
        <button
          onClick={handleMealCancel}
          className={
            "bg-white border w-10 h-10 rounded-lg flex justify-center items-center shadow-lg shadow-gray-200 hover:shadow-gray-300 transition-all duration-300 ease-in-out text-gray-500 hover:text-gray-800"
          }
        >
          <FontAwesomeIcon icon={faXmark} width={12} />
        </button>
      </div>
    </div>
  );
};

export default NewMenuItemCard;
