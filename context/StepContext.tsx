import React, { createContext, useContext } from "react";
import { useState } from "react";

const StepContext = createContext({
  steps: [] as string[],
  setStep: (step: string) => {},
  getCurrentStep: "",
  goBack: () => {},
  modalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export function useSteps() {
  return useContext(StepContext);
}

export function AppStepProvider({ children }: Props) {
  //FIXME: Update any type
  const [steps, setSteps] = useState([] as string[]);
  const [modalOpen, setModalOpen] = useState(false);

  const setStep = (step: string) => {
    setSteps([...steps, step]);
  };

  const getCurrentStep = steps[steps.length - 1];

  const goBack = () => {
    if (steps.length > 1) {
      setSteps(steps.slice(0, -1));
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetSteps();
  };

  const resetSteps = () => {
    setSteps([]);
  };

  return (
    <StepContext.Provider
      value={{
        steps,
        setStep,
        getCurrentStep,
        goBack,
        openModal,
        closeModal,
        modalOpen,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}
