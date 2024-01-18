"use server";
import { Genres, Track } from "@spotify/web-api-ts-sdk";
import { api } from "./spotifyClient";
import { StringDecoder } from "string_decoder";

export const getGenres = async (): Promise<string[]> => {
  const genres = await api.recommendations.genreSeeds();
  return genres.genres;
};

export const getRandomSongs = async (
  amount: number,
  genre: string
): Promise<Track[]> => {
  console.log(genre);
  const recommendations = await api.recommendations.get({
    limit: amount,
    seed_genres: [genre],
    // seed_artists: ["7vk5e3vY1uw9plTHJAMwjN"],
  });

  // const filteredTracks = tracks.tracks.filter(t => t.artists.map(a => a.id).includes("7vk5e3vY1uw9plTHJAMwjN"));

  // const artistTracks = await api.artists.topTracks("7vk5e3vY1uw9plTHJAMwjN", "ES")
  // return artistTracks.tracks;
  return recommendations.tracks;
};
