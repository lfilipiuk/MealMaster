import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMenu } from "../../../context/MenuContext";

const SaveMenuButton = () => {
  const { user, error, isLoading } = useUser();
  const { menuDate, menuItems, getIdForDate } = useMenu();
  const [isSaving, setIsSaving] = React.useState(false);

  async function handleSave() {
    setIsSaving(true);

    const menu = {
      id: getIdForDate(menuDate),
      userId: user?.email,
      date: menuDate.toDateString(),
      menu: menuItems,
    };

    //use fetch api post
    const response = await fetch(`/api/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    });

    const data = await response.json();

    //if response is a success, set isSaving to false
    if (response.ok) {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <button
        disabled={isSaving}
        onClick={handleSave}
        className={
          "my-6 w-48 bg-white text-gray-500 font-proxima text-lg rounded-full px-4 py-1 mx-auto border-gray-200 border shadow-lg block hover:shadow-gray-300 hover:text-black transition-all duration-500 ease-in-out cursor-pointer"
        }
      >
        <div className={"flex items-center justify-center gap-2"}>
          <p>{isSaving ? "Saving..." : "Save Menu"}</p>
        </div>
      </button>
    </div>
  );
};

export default SaveMenuButton;
