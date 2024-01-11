import { LockClosedIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/outline";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import React from "react";
import { ShuffleOutline } from "react-ionicons";
import ShuffleIcon from "./extra/ShuffleIcon";

interface RowButtonsProps {
  locked: boolean;
}
const RowButtons = (props: RowButtonsProps) => {
  return (
    <div className="flex justify-between mt-4 w-full">
      <button className="w-[20%]">
        {props.locked ? (
          <LockClosedIcon className="h-fit" />
        ) : (
          <LockOpenIcon className="h-fit" />
        )}
      </button>
      <button className="w-[20%]">
        <PlayIcon className="h-fit" />
      </button>
      <button className="w-[20%]">
        <ShuffleIcon className="h-fit" />
      </button>
    </div>
  );
};

export default RowButtons;
