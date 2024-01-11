"use client";
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
    <div className="flex h-[70%] w-full bg-slate-300">
      {songList.map((song, index) => (
        <SongCard
          color={song.color}
          songTitle={song.title}
          key={index}
          songImageLink="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/spotify-style-illustration-album-art-2020-design-template-ff72ffd1b198e4a94ee8c58cceb1da19_screen.jpg?ts=1600257159"
        />
      ))}
    </div>
  );
};
