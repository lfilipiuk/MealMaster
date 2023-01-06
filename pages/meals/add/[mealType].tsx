import React from "react";
import AddMeal from "../../../components/views/AddMeal";
import { useRouter } from "next/router";

const AddMealPage = () => {
  const name = useRouter().query.mealType as string;

  //TODO: Add layout for this page

  return (
    <div className={"text-black w-1/2 mx-auto shadow-2xl pt-10 rounded"}>
      {/*<AddMeal name={name} />*/}
    </div>
  );
};

export default AddMealPage;
