import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export function LogoutButton() {
  return (
    <div className={""}>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        className={
          "bg-gray-400 h-14 w-14 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500 transition duration-300 ease-in-out text-white"
        }
        href="/api/auth/logout"
      >
        <FontAwesomeIcon icon={faRightFromBracket} width={20} />
      </a>
    </div>
  );
}
