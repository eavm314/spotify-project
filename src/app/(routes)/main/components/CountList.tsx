"use client"

import { SubTitleText, Text } from "@/components/text/text";
import { useGenresStore } from "../context/context"
import { useShallow } from "zustand/react/shallow";
import { CountType } from "@/types/general";
import { Button } from "@/components/input/Button";
import { createPlaylist } from "@/spotifyServices/createPlaylist";

interface Props {
  title: string,
  objectKey: CountType
}

export const CountList = ({ title, objectKey }: Props) => {
  const countState = useGenresStore(useShallow((state) => {
    const mapping: {[key: string]: Record<string,string[]>} = {
      "genre": state.genresCount,
      "artist": state.artistsCount,
      "year": state.yearCount
    }
    return mapping[objectKey]
  }));

  const countArray = Object.entries(countState);
  countArray.sort((a, b) => b[1].length - a[1].length);

  return (
    <div className="w-100">
      <SubTitleText>{title}</SubTitleText>
      {countArray.map((item) =>
        <div className="flex justify-between">
          <div className="w-60">
            <Text>{item[0]}</Text>
          </div>
          <div>
            <Text>{item[1].length}</Text>
          </div>
          <div>
            <Button action={() => createPlaylist(item[0], "Created by API", item[1])}>Crear Playlist</Button>
          </div>
        </div>
      )}
    </div>
  )
}
