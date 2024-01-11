import { LockClosedIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/outline";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import React from "react";
import ShuffleIcon from "./extra/ShuffleIcon";

interface RowButtonsProps {
  locked: boolean;
  changeLock: () => void;
}
const RowButtons = (props: RowButtonsProps) => {
  return (
    <div className="flex justify-between mt-4 w-full">
      <button className="w-[20%] text-white hover:scale-125 transition duration-300 ease-in-out" onClick={props.changeLock}>
        {props.locked ? (
          <LockClosedIcon className="h-fit" />
        ) : (
          <LockOpenIcon className="h-fit" />
        )}
      </button>
      <button className="w-[20%] text-white hover:scale-125 transition duration-300 ease-in-out">
        <PlayIcon className="h-fit" />
      </button>
      <button className="w-[20%] text-white hover:scale-125 transition duration-300 ease-in-out">
        <ShuffleIcon className="h-fit" />
      </button>
    </div>
  );
};

export default RowButtons;
