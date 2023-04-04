import { DUMMY_MENU } from "../DUMMY_MENU";

export async function saveMenu(menuDate: Date, menuItems: any, userEmail: any) {
  const menu = {
    userId: userEmail,
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

  //console.log("saveMenu", menu, data);
}

export async function fetchMenus(userEmail: any, menuDate: any) {
  const res = await fetch(`/api/menus/${userEmail}`);
  const data = await res.json();

  if (data && data.length > 0) {
    //map menu to array
    const mappedMenu = data.map((menu: any) => {
      return {
        id: menu._id,
        date: menu.date,
        menu: menu.menu,
      };
    });

    //console.log("fetchMenus", mappedMenu);

    //get menu for current date
    const menuForDate = mappedMenu.find(
      (menu: any) => menu.date === menuDate.toDateString()
    );

    let menuItems;
    if (menuForDate) {
      menuItems = menuForDate.menu;
    } else {
      menuItems = DUMMY_MENU;
    }
    //console.log("fetchMenus", menuItems, mappedMenu);
    return { menuItems, mappedMenu };
  }
  //console.log("fetchMenus", DUMMY_MENU, []);
  return { menuItems: DUMMY_MENU, mappedMenu: [] };
}

export async function saveAndLoadMenus(
  menuDate: Date,
  menuItems: any,
  userEmail: any
) {
  // console.log("saveAndLoadMenus", menuDate, menuItems, userEmail);

  await saveMenu(menuDate, menuItems, userEmail);
  return await fetchMenus(userEmail, menuDate);
}
