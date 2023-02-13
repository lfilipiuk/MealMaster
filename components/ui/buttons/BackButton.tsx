import React from "react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSteps } from "../../../context/StepContext";

type Props = {
  onClick?: () => void;
};

const BackButton = ({ onClick }: Props) => {
  const { goBack } = useSteps();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      goBack();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={
        "text-gray-400 cursor-pointer hover:text-gray-600 transition-all duration-100 ease-in-out"
      }
    >
      <FontAwesomeIcon icon={faAngleLeft} width={10} />
    </div>
  );
};

export default BackButton;
