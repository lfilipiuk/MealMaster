import React from "react";
import styles from "../../styles/MealIcon.module.css";

import Croissant from "../../public/icons/croissant 1.svg";
import Donut from "../../public/icons/donut 1.svg";
import Eggs from "../../public/icons/eggs 1.svg";
import Turkey from "../../public/icons/turkey 1.svg";
import Salad from "../../public/icons/vegetables-salad 1.svg";

type Props = {
  icon: string;
  active?: boolean;
};

const MenuIcon = ({ icon, active = false }: Props) => {
  let mealIcon;

  const style = active ? styles.active : styles.inactive;

  switch (icon) {
    case "Croissant":
      mealIcon = <Croissant width={30} height={30} className={style} />;
      break;
    case "Donut":
      mealIcon = <Donut width={30} height={30} className={style} />;
      break;
    case "Eggs":
      mealIcon = <Eggs width={30} height={30} className={style} />;
      break;
    case "Turkey":
      mealIcon = <Turkey width={30} height={30} className={style} />;
      break;
    case "Salad":
      mealIcon = <Salad width={30} height={30} className={style} />;
      break;
    default:
      mealIcon = <Eggs width={30} height={30} className={style} />;
      break;
  }

  return <div>{mealIcon}</div>;
};

export default MenuIcon;
