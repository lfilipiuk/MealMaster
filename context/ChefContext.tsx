import React, { createContext, useContext } from "react";
import { useState } from "react";
import { DUMMY_IDEAS } from "../utils/DUMMY_IDEAS";

const ChefContext = createContext({
  searchValue: "",
  setSearchValue: (value: string) => {},
  mealIdeas: [{ name: "", calories: 0, ingredients: [], instructions: "" }],
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
