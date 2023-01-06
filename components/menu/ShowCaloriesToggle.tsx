import { Tooltip } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import React from "react";

export function ShowCaloriesToggle(props: {
  onChange: () => void;
  checked: boolean;
  disabled: boolean;
}) {
  return (
    <div className={"flex gap-1"}>
      <div className={"flex items-center gap-1"}>
        <h3>Show calories</h3>
        <Tooltip
          className={"bg-white text-black font-proxima shadow-lg border p-3"}
          content="Show calories for each meal"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
        >
          <FontAwesomeIcon
            className={"text-gray-400"}
            icon={faCircleQuestion}
            width={15}
          />
        </Tooltip>
      </div>

      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer -z-10 cursor-pointer"
          onChange={props.onChange}
          checked={props.checked}
          disabled={props.disabled}
        />
        <div className="-z-10 w-9 h-5 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green"></div>
      </label>
    </div>
  );
}
