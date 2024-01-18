"use client";
import { getRandomSongs } from "@/spotifyServices/getRandomSongs";
import { SongCard } from "../card/SongCard";
import { Track as Song } from "@spotify/web-api-ts-sdk";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GENRE } from "@/constants/constants";
import LockArrayContext, {
  LockArrayContextProvider,
} from "@/context/LockArrayContext";

export const SongsContainer = () => {
  // Current tracks in container
  const [songs, setSongs] = useState<Song[]>([]);
  const searchParams = useSearchParams();

  const { lockArray, setLockArray } = useContext(LockArrayContext);

  // useEffect para actualizar el genero y la función de distribución

  useEffect(() => {
    if (songs.length === 0) {
      const genre: string = searchParams.get(GENRE)?.toString() || "rock";
      getRandomSongs(lockArray.length, genre).then((randomSongs) =>
        setSongs(randomSongs)
      );
    }

    // Función de distribución
    const handleKeyDown = (event: any) => {
      if (event.key === " ") {
        const genre: string = searchParams.get(GENRE)?.toString() || "rock";
        getRandomSongs(lockArray.length, genre).then((songsObtained) => {
          // const newSongs: Song[] = songs;
          // for (let i = 0, j = 0; i < lockArray.length; i++) {
          //   if (!lockArray[i]) {
          //     newSongs[i] = songsObtained[j];
          //     j++;
          //   }
          // }
          setSongs(songsObtained);
        });
      }
    };

    // Actualizar la función redefinida
    window.addEventListener("keydown", handleKeyDown);
    // Remover la función y el listener una vez que el componente es removido
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchParams]);

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
  );
};
