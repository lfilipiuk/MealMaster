import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClick: () => void;
};

const NewMenuItemButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={
        "bg-white text-gray-500 font-proxima text-lg rounded-full px-4 py-1 mx-auto border-gray-200 border shadow-lg block hover:shadow-gray-300 hover:text-black transition-all duration-500 ease-in-out cursor-pointer"
      }
    >
      <div className={"flex items-center justify-center gap-2"}>
        <FontAwesomeIcon icon={faPlus} width={15} />
        <p>Add another meal</p>
      </div>
    </button>
  );
};

export default NewMenuItemButton;
