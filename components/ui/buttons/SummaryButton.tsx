import React from "react";
import ListImage from "../../../public/icons/list-ordered-rec.2 1.svg";
import { useSteps } from "../../../context/StepContext";
import { MealActions } from "../../../utils/constants";

const SummaryButton = () => {
  const { setModalOpen, setCurrentStep } = useSteps();

  function openModal() {
    setCurrentStep(MealActions.SUMMARY);
    setModalOpen(true);
  }

  return (
    <div className={"fixed right-10 bottom-28"}>
      <div
        onClick={openModal}
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
