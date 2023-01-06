import React from "react";
import chef from "../../../public/images/chef.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import Image from "next/image";

type Props = {
  onOutOfIdeas: () => void;
};

const OutOfMealIdeasButton = ({ onOutOfIdeas }: Props) => {
  return (
    <div
      onClick={onOutOfIdeas}
      className={
        "relative flex flex-row justify-between items-center bg-green-light hover:bg-green-medium p-3 rounded-lg cursor-pointer transition-all duration-50 ease-in-out"
      }
    >
      <div className={"absolute left-2/3"}>
        <Image src={chef} alt={"chef"} height={100} />
      </div>

      <div>
        <h2 className={"text-lg"}>Out of meal ideas?</h2>
        <div className={"text-gray-500"}>
          <p>Alex Ingredient is here to help!</p>
          <p>Get AI-generated meal ideas now.</p>
        </div>
      </div>
      <div className={"cursor-pointer text-gray-400 "}>
        <FontAwesomeIcon icon={faAngleRight} width={10} />
      </div>
    </div>
  );
};

export default OutOfMealIdeasButton;
