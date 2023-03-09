import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { ShowCaloriesToggle } from "./ShowCaloriesToggle";
import React from "react";
import { getFirstName, greetUserBasedOnTimeOfDay } from "../../utils/functions";
import { useUser } from "@auth0/nextjs-auth0/client";

export function MenuHeader(props: {
  formattedDate: string;
  onChange: () => void;
  checked: boolean;
  disabled: boolean;
  onCalendarClick: () => void;
}) {
  const { user, error: userError, isLoading } = useUser();

  const greeting = greetUserBasedOnTimeOfDay();

  let firstName = "";
  if (user) {
    firstName = getFirstName(user.name);
  }

  return (
    <>
      <h1
        className={"text-black font-proxima text-left font-bold text-3xl p-0"}
      >
        {greeting} {firstName}!
      </h1>
      <div
        className={
          "flex flex-row gap-4 items-end justify-between text-gray-500"
        }
      >
        <div className={"text-sm flex gap-1 items-top"}>
          <span>Here are your meals for </span>
          <span className={"font-semibold"}>{props.formattedDate}</span>
          <div
            onClick={props.onCalendarClick}
            className={
              "cursor-pointer hover:text-black transition-all duration-200 ease-in-out w-3"
            }
          >
            <FontAwesomeIcon className={"pt-0.5"} icon={faCalendar} />
          </div>
        </div>
        <ShowCaloriesToggle
          onChange={props.onChange}
          checked={props.checked}
          disabled={props.disabled}
        />
      </div>
    </>
  );
}
