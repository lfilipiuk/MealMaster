import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMutation } from "urql";
import { SAVE_MENU_MUTATION } from "../../../utils/graphql/saveMenu";
import { useMenu } from "../../../context/MenuContext";

const SaveMenuButton = () => {
  const { user, error, isLoading } = useUser();
  const [result, executeMutation] = useMutation(SAVE_MENU_MUTATION);
  const { menuDate, menuItems, getIdForDate } = useMenu();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  async function handleSave(values: any) {
    const id = getIdForDate(menuDate);
    if (id !== "") {
    } else {
      const day = {
        userId: user?.email,
        date: menuDate.toDateString(),
        menu: menuItems,
      };

      const { data, error } = await executeMutation(day);
      if (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <button
        onClick={handleSave}
        className={
          "my-6 w-48 bg-white text-gray-500 font-proxima text-lg rounded-full px-4 py-1 mx-auto border-gray-200 border shadow-lg block hover:shadow-gray-300 hover:text-black transition-all duration-500 ease-in-out cursor-pointer"
        }
      >
        <div className={"flex items-center justify-center gap-2"}>
          <p>Save Menu</p>
        </div>
      </button>
    </div>
  );
};

export default SaveMenuButton;
