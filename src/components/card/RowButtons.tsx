import { LockClosedIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/outline";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import ShuffleIcon from "./extra/ShuffleIcon";
import SongsContext from "@/context/SongsContext";

interface RowButtonsProps {
  cardPos: number;
  locked: boolean;
  changeLock: () => void;
}
const RowButtons = (props: RowButtonsProps) => {
  const { getRandomSong } = useContext(SongsContext);

  return (
    <div className="flex justify-between mt-4 w-full">
      <button
        className="w-[20%] text-white hover:scale-125 transition duration-300 ease-in-out"
        onClick={(e) => {
          e.currentTarget.blur();
          props.changeLock();
        }}
      >
        {props.locked ? (
          <LockClosedIcon className="h-fit" />
        ) : (
          <LockOpenIcon className="h-fit" />
        )}
      </button>
      <button className="w-[20%] text-white hover:scale-125 transition duration-300 ease-in-out">
        <PlayIcon className="h-fit" />
      </button>
      <button
        className={`w-[20%] text-white ${
          !props.locked ? " hover:scale-125 transition duration-300 ease-in-out" : ""
        }`}
        disabled={props.locked}
        onClick={(e) => {
          getRandomSong(props.cardPos);
          e.currentTarget.blur();
        }}
      >
        <ShuffleIcon className="h-fit" />
      </button>
    </div>
  );
};

export default RowButtons;
