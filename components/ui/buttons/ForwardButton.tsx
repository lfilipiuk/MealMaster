import React from "react";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onClick: () => void;
};

const ForwardButton = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={
        "text-gray-400 cursor-pointer hover:text-gray-600 transition-all duration-100 ease-in-out"
      }
    >
      <FontAwesomeIcon icon={faAngleRight} width={10} />
    </div>
  );
};

export default ForwardButton;
