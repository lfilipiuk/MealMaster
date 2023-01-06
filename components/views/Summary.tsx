import React from "react";
import { useMenu } from "../../context/MenuContext";
import Divider from "../ui/other/Divider";

const Summary = () => {
  const { menuItems } = useMenu();

  const filteredMenuItems = menuItems.filter((item) => item.name !== "");

  return (
    <div>
      <h1 className={"font-bold text-2xl"}>Summary</h1>
      <ul>
        {filteredMenuItems.map((item) => (
          <li key={item.type}>
            <Divider text={item.type} />
            <h2 className={"text-lg"}>{item.name}</h2>
          </li>
        ))}
      </ul>
      <h1 className={"font-bold text-2xl my-3"}>Shopping List</h1>
    </div>
  );
};

export default Summary;
