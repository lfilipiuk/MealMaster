import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMenu } from "../../../context/MenuContext";
import { saveAndLoadMenus } from "../../../utils/api/functions";

const SaveMenuButton = () => {
  const { user, error, isLoading } = useUser();
  const [isSaving, setIsSaving] = React.useState(false);

  const { menuDate, menuItems, getIdForDate } = useMenu();
  const { setMenuDate, setMenuItems, setWholeMenu, getMenuForDate } = useMenu();

  const userEmail = user?.email;

  async function handleSaveAndLoad() {
    const { menuItems: fetchedMenuItems, mappedMenu } = await saveAndLoadMenus(
      menuDate,
      menuItems,
      userEmail
    );
    setMenuItems(fetchedMenuItems);
    setWholeMenu(mappedMenu);
  }

  return (
    <div>
      <button
        disabled={isSaving}
        onClick={handleSaveAndLoad}
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
