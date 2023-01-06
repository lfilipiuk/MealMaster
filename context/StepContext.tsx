import React, { createContext, useContext } from "react";
import { useState } from "react";

const StepContext = createContext({
  currentStep: "",
  setCurrentStep: (step: string) => {},
  modalOpen: false,
  setModalOpen: (open: boolean) => {},
});

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function useSteps() {
  return useContext(StepContext);
}

export function AppStepProvider({ children }: Props) {
  const [currentStep, setCurrentStep] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <StepContext.Provider
      value={{ currentStep, setCurrentStep, modalOpen, setModalOpen }}
    >
      {children}
    </StepContext.Provider>
  );
}
