import React, { createContext, useContext } from "react";
import { useState } from "react";
import { DUMMY_IDEAS } from "../utils/DUMMY_IDEAS";

const MealContext = createContext({
  selectedMeal: {
    details: {
      name: "",
      calories: 0,
      ingredients: [],
      instructions: "",
    },
  },
  setSelectedMeal: (meal: any) => {},
});

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function useMeal() {
  return useContext(MealContext);
}

export function MealProvider({ children }: Props) {
  const [selectedMeal, setSelectedMeal] = useState<any>({});

  return (
    <MealContext.Provider value={{ selectedMeal, setSelectedMeal }}>
      {children}
    </MealContext.Provider>
  );
}
