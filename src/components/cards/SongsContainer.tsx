"use client"
import { SongCard } from "./SongCard";

export const SongsContainer = () => {

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
    <div className="flex h-96 w-full bg-slate-300">
      {songList.map((song, index) => (
        <SongCard color={song.color} songTitle={song.title} key={index} />
      ))}
    </div>
  );
};
