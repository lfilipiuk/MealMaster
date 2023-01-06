import React from "react";
import styles from "./OrDivider.module.css";

type Props = {
  text: string;
};

const Divider = ({ text }: Props) => {
  return (
    <div className={"flex items-center gap-3 justify-center my-2"}>
      <hr className="my-4 w-1/2 h-0.5 bg-gray-300 rounded border-0" />
      <h1
        className={
          "text-gray-400 font-proxima font-semibold text-sm uppercase tracking-wider whitespace-nowrap"
        }
      >
        {text}
      </h1>
      <hr className="my-4 w-1/2 h-0.5 bg-gray-300 rounded border-0" />
    </div>
  );
};

export default Divider;
