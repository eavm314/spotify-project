"use client";
import { getRandomSongs } from "@/spotifyServices/getRandomSongs";
import { SongCard } from "../card/SongCard";
import { Track as Song } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

export const SongsContainer = () => {
  // Current tracks in container
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (songs.length === 0)
      getRandomSongs(5).then((randomSongs) => setSongs(randomSongs));
    // Define the event handler
    const handleKeyDown = (event: any) => {
      if (event.key === " ") {
        // Check if the pressed key is space
        // Fetch and set new songs when space bar is pressed
        getRandomSongs(5).then((songsObtained) => setSongs(songsObtained));
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
        />
      ))}
    </div>
  );
};
