import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export function UserProfileButton() {
  return (
    <div className={""}>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        className={
          "bg-blue-400 h-14 w-14 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition duration-300 ease-in-out text-white"
        }
        href="/profile"
      >
        <FontAwesomeIcon icon={faUser} width={20} />
      </a>
    </div>
  );
}
