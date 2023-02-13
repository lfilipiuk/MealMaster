import React, { createContext, useContext, useState } from "react";
import { DUMMY_IDEAS } from "../utils/DUMMY_IDEAS";
import { MealIdea } from "../types/MealIdea";

const ChefContext = createContext({
  searchValue: "",
  setSearchValue: (value: string) => {},
  mealIdeas: {} as MealIdea[],
  setMealIdeas: (mealIdeas: any) => {},
});

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function useChef() {
  return useContext(ChefContext);
}

export function ChefProvider({ children }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [mealIdeas, setMealIdeas] = useState<any>(DUMMY_IDEAS);

  return (
    <ChefContext.Provider
      value={{ searchValue, setSearchValue, mealIdeas, setMealIdeas }}
    >
      {children}
    </ChefContext.Provider>
  );
}
