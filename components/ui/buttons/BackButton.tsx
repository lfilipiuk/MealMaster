import React from "react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onClick: () => void;
};

const BackButton = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={
        "text-gray-400 cursor-pointer hover:text-gray-600 transition-all duration-100 ease-in-out"
      }
    >
      <FontAwesomeIcon icon={faAngleLeft} width={10} />
    </div>
  );
};

export default BackButton;
