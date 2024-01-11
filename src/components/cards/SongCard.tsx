import { useState } from "react";
import RowButtons from "./RowButtons";
import SongImage from "./SongImage";

interface SongCardProps {
  songTitle: string;
  color: string;
}
export const SongCard = (props: SongCardProps) => {

  const colorMap: Record<string, string> = {
    "Electric Dreams": "bg-[#1DB954]",
    "Starry Night": "bg-[#F8D100]",
    "Golden Sunset": "bg-[#FD6925]",
    "Ocean Waves": "bg-[#00BFFF]",
    "Purple Haze": "bg-[#8A00B8]",
  };

  const[locked, setLocked] = useState(false);
  
  return (
    <div
      className={`flex flex-1 flex-col h-full ${colorMap[props.songTitle]} items-center justify-evenly py-3 px-7`}
    >
      <SongImage />
      <h1 className="text-white font-bold text-center text-2xl">
        {props.songTitle}
      </h1>
      <RowButtons locked={locked} />
    </div>
  );
};
