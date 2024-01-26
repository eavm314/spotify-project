"use server";
import { Genres, Track } from "@spotify/web-api-ts-sdk";
import { api } from "./spotifyClient";
import { StringDecoder } from "string_decoder";
import { cache } from "react";

export const getGenres = cache(async (): Promise<string[]> => {
  const genres = await api.recommendations.genreSeeds();
  return genres.genres;
});

export const getRandomSongs = cache(async (
  amount: number,
  genre: string
): Promise<Track[]> => {
  console.log(genre);

  const recommendations = await api.recommendations.get({
    limit: amount,
    seed_genres: [genre],
    // seed_artists: ["7vk5e3vY1uw9plTHJAMwjN"],
  });
  return recommendations.tracks;
});
