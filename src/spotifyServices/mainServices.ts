"use server";
import { Genres, Page, SavedTrack, Track } from "@spotify/web-api-ts-sdk";
import { api } from "./spotifyClient";
import { cache } from "react";
import { CompleteTrack } from "@/types/spotify";

export const getTestSongs = cache(async (): Promise<Track[]> => {
  return await api.tracks.get(["0FE9t6xYkqWXU2ahLh6D8X","698ItKASDavgwZ3WjaWjtz","62vDrkBEyJYEOFj1ScBqM7","1yoMvmasuxZfqHEipJhRbp","3NHVe5ZYMitXZx14MYkvin","4lsOsGMzO1yCjGVucoWOZ1"]);
});

export const getSavedSongs = cache(async (): Promise<Track[]> => {
  const tracks: Track[] = [];

  const lim = 50;
  let off = 0;
  while (true) {
    const ts = await api.currentUser.tracks.savedTracks(lim, off);
    if (ts.items.length < 1) {
      break;
    }
    tracks.push(...ts.items.map(st => st.track))
    off += lim;
  }
  // console.log(tracks)
  return tracks;
});

export const getCompleteTrack = cache(async (track: Track): Promise<CompleteTrack> => {
  // Get Genre
  const artists = await Promise.all(track.artists.map(async (art) => await api.artists.get(art.id)));
  const artGen = artists.flatMap(art => art.genres);
  const genres = [...new Set(artGen)];
  // console.log(genres)

  // Get Year
  const releaseDate = new Date(track.album.release_date);
  console.log(track.album.release_date)
  return { ...track, genres, releaseYear: `${releaseDate.getFullYear()}` };
});