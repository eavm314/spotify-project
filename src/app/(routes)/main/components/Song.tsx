"use client"
import { SubTitleText, Text } from "@/components/text/text";
import { getCompleteTrack } from "@/spotifyServices/mainServices";
import { CompleteTrack } from "@/types/spotify";
import { Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import { useGenresStore } from "../context/context";
import { useShallow } from "zustand/react/shallow";

interface Props {
  simpleTrack: Track;
}

export const Song = ({ simpleTrack }: Props) => {
  const [track, setTrack] = useState<CompleteTrack>({ ...simpleTrack, genres: [], releaseYear: "0" })

  const updateCount = useGenresStore(useShallow((state) => state.updateCount));

  const fetchGenre = async () => {
    const completeTrack = await getCompleteTrack(simpleTrack);
    setTrack(completeTrack);

    completeTrack.genres.forEach((gen) => updateCount("genre", gen, completeTrack.uri));
    completeTrack.artists.forEach((art) => updateCount("artist", art.name, completeTrack.uri));
    updateCount("year", completeTrack.releaseYear, completeTrack.uri);
  }

  useEffect(() => {
    console.log("UseEffect: ",simpleTrack.name);
    fetchGenre();
  }, []);

  return (
    <div className="my-4 border-2 border-red-500 rounded-md">
      <SubTitleText>{track.name}</SubTitleText>
      <Text>Artists: {track.artists.map(art => art.name).join(", ")}</Text>
      <Text>Genres: {track.genres.join(", ")}</Text>
      <Text>Year: {track.releaseYear}</Text>
    </div>
  )
}