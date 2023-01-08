import React, { createContext, useContext, useState } from "react";
import { DUMMY_MENU } from "../utils/DUMMY_MENU";
import { formatDate, getStrippedDate } from "../utils/functions";

export interface MenuItem {
  type: string;
  name: string;
  calories: number;
  icon?: string;
}

export interface MenuDay {
  id: string;
  date: string;
  menu: MenuItem[];
}

export interface MenuContextValue {
  menuDate: Date;
  setMenuDate: (date: Date) => void;
  menuItems: MenuItem[];
  addMenuItem: (menuItem: MenuItem) => void;
  removeMenuItem: (menuItemType: string) => void;
  currentMenuItem: string;
  setCurrentMenuItem: (type: string) => void;
  setMenuItem: (menuItem: MenuItem) => void;
  setMenuItems: (menuItems: MenuItem[]) => void;
  wholeMenu: MenuDay[];
  setWholeMenu: (menu: MenuDay[]) => void;
  getMenuForDate: (date: Date) => { id: string; menu: MenuItem[] };
  getIdForDate: (date: Date) => string;
}

const initialValue: MenuContextValue = {
  menuDate: getStrippedDate(new Date()),
  setMenuDate: (date: Date) => {},
  menuItems: DUMMY_MENU,
  addMenuItem: () => {},
  removeMenuItem: () => {},
  currentMenuItem: "",
  setCurrentMenuItem: () => {},
  setMenuItem: () => {},
  setMenuItems: () => {},
  wholeMenu: [],
  setWholeMenu: () => {},
  getMenuForDate: () => ({ id: "", menu: [] }),
  getIdForDate: () => "",
};

export const MenuContext = createContext<MenuContextValue>(initialValue);

export function useMenu() {
  return useContext(MenuContext);
}

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function MenuProvider({ children }: Props) {
  const [wholeMenu, setWholeMenu] = useState<MenuDay[]>(initialValue.wholeMenu);
  const [menuDate, setMenuDate] = useState(initialValue.menuDate);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(
    initialValue.menuItems
  );
  const [currentMenuItem, setCurrentMenuItem] = useState<string>("");

  function addMenuItem(meal: MenuItem) {
    setMenuItems([...menuItems, meal]);
  }

  function removeMenuItem(mealType: string) {
    setMenuItems(menuItems.filter((meal) => meal.type !== mealType));
  }

  function setMenuItem(newMenuItem: MenuItem) {
    const newMenuItems = menuItems.map((menuItem) => {
      if (menuItem.type === newMenuItem.type) {
        return {
          ...menuItem,
          name: newMenuItem.name,
          calories: newMenuItem.calories,
        };
      }
      return menuItem;
    });

    setMenuItems(newMenuItems);
  }

  function getMenuForDate(date: Date) {
    const formattedDate = date.toDateString();
    const menuForDay: any = wholeMenu.find(
      (menuDay: MenuDay) => menuDay.date === formattedDate
    );

    if (menuForDay) {
      return {
        id: menuForDay.id,
        menu: menuForDay.menu,
      };
    } else {
      return {
        id: "",
        menu: DUMMY_MENU,
      };
    }
  }

  function getIdForDate(date: Date) {
    const formattedDate = date.toDateString();
    const menuForDay: any = wholeMenu.find(
      (menuDay: MenuDay) => menuDay.date === formattedDate
    );

    if (menuForDay) {
      return menuForDay.id;
    } else {
      return "";
    }
  }

  const value: MenuContextValue = {
    menuItems: menuItems,
    addMenuItem,
    removeMenuItem: removeMenuItem,
    currentMenuItem: currentMenuItem,
    setCurrentMenuItem: setCurrentMenuItem,
    setMenuItem: setMenuItem,

    menuDate: menuDate,
    setMenuDate: setMenuDate,
    setMenuItems: setMenuItems,

    wholeMenu: wholeMenu,
    setWholeMenu: setWholeMenu,
    getMenuForDate: getMenuForDate,
    getIdForDate: getIdForDate,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
