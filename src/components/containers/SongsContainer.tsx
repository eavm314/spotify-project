"use client";
import { SongCard } from "../card/SongCard";
import { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CreatePlaylistButton } from "../input/CreatePlaylistButton";
import SongsContext from "@/context/SongsContext";
import SurpriseMeButton from "../input/SurpriseMeButton";

export const SongsContainer = () => {
  // Current tracks in container
  const searchParams = useSearchParams();
  const { songs, handleKeyDown } = useContext(SongsContext);

  // useEffect para actualizar el genero y la función de distribución
  useEffect(() => {
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
      <div className="absolute top-5 right-5">
        <SurpriseMeButton />
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
