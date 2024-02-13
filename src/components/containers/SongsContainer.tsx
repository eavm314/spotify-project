"use client";
import { getRandomSongs } from "@/spotifyServices/getRandomSongs";
import { SongCard } from "../card/SongCard";
import { Track as Song } from "@spotify/web-api-ts-sdk";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GENRE } from "@/constants/constants";
import LockArrayContext from "@/context/LockArrayContext";
import { CreatePlaylistButton } from "../input/CreatePlaylistButton";

export const SongsContainer = () => {
  // Current tracks in container
  const [songs, setSongs] = useState<Song[]>([]);
  const searchParams = useSearchParams();

  const { lockArray } = useContext(LockArrayContext);

  // Género actualizado solamente si cambian los parámetros de búsqueda
  const genre = useMemo(() => {
    return searchParams.get(GENRE)?.toString();
  }, [searchParams]);

  // Función de distribución
  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === " ") {
        getRandomSongs(lockArray.length, genre || "rock").then(
          (songsObtained) =>
            setSongs(
              songsObtained.map((song, index) =>
                lockArray[index] ? songs[index] : song
              )
            )
        );
      }
    },
    [searchParams, songs]
  );

  // useEffect para actualizar el genero y la función de distribución
  useEffect(() => {
    if (songs.length === 0 && genre) {
      getRandomSongs(lockArray.length, genre).then((randomSongs) =>
        setSongs(randomSongs)
      );
    }

    console.log(songs.map((song) => song.name));

    window.addEventListener("keydown", handleKeyDown);
    // Remover la función y el listener una vez que el componente es removido
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchParams, songs]);

  const songList = [
    {
      title: "Electric Dreams",
      color: "#1DB954", // Spotify Green
    },
    {
      title: "Starry Night",
      color: "#F8D100", // Spotify Yellow
    },
    {
      title: "Golden Sunset",
      color: "#FD6925", // Spotify Orange
    },
    {
      title: "Ocean Waves",
      color: "#00BFFF", // Spotify Blue
    },
    {
      title: "Purple Haze",
      color: "#8A00B8", // Spotify Purple
    },
  ];

  return (
    <>
      <div className="absolute top-5 left-5">
        <CreatePlaylistButton uris={songs.map((s) => s.uri)} />
      </div>
      <div className="flex h-[70%] w-full bg-slate-300">
        {songs.map((song, index) => (
          <SongCard
            color={songList[index].title}
            key={index}
            songTitle={song.name}
            songImageLink={song.album.images[0].url}
            cardPos={index}
          />
        ))}
      </div>
    </>
  );
};
