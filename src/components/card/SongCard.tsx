"use client";
import { useContext, useEffect, useState } from "react";
import RowButtons from "./RowButtons";
import SongImage from "./SongImage";
import LockArrayContext from "@/context/LockArrayContext";

interface SongCardProps {
  cardPos: number;
  songTitle: string;
  color: string;
  songImageLink: string;
}
export const SongCard = (props: SongCardProps) => {
  // TODO: Insertar definición de colores según portada
  const colorMap: Record<string, string> = {
    "Electric Dreams": "bg-[#1DB954]",
    "Starry Night": "bg-[#F8D100]",
    "Golden Sunset": "bg-[#FD6925]",
    "Ocean Waves": "bg-[#00BFFF]",
    "Purple Haze": "bg-[#8A00B8]",
  };

  const [locked, setLocked] = useState(false);
  const { lockArray, setLockArray } = useContext(LockArrayContext);

  const changeLock = () => {
    setLocked(!locked);
  };

  useEffect(() => {
    const newLockArray = lockArray;
    newLockArray[props.cardPos] = locked;
    setLockArray(newLockArray);
  }, [locked]);

  useEffect(()=>{
    setLocked(lockArray[props.cardPos])
  },[lockArray])

  return (
    <div
      className={`flex flex-1 flex-col h-full ${
        colorMap[props.color]
      } items-center justify-evenly py-3 px-7`}
    >
      <SongImage linkImage={props.songImageLink} />
      <h1 className="text-white font-bold text-center text-2xl">
        {props.songTitle}
      </h1>
      <RowButtons
        locked={locked}
        changeLock={changeLock}
        cardPos={props.cardPos}
      />
    </div>
  );
};
