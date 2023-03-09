import React from "react";
import ListImage from "../../../public/icons/list-ordered-rec.2 1.svg";
import { useSteps } from "../../../context/StepContext";
import { MealActions } from "../../../utils/constants";

const SummaryButton = () => {
  const { openModal, setStep } = useSteps();
  const { SUMMARY } = MealActions;

  function handleClick() {
    setStep(SUMMARY);
    openModal();
  }

  return (
    <div className={""}>
      <div
        onClick={handleClick}
        className={
          "bg-green h-14 w-14 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-dark transition duration-300 ease-in-out"
        }
      >
        <ListImage />
      </div>
    </div>
  );
};

export default SummaryButton;
