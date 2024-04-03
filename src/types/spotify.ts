import { Track } from "@spotify/web-api-ts-sdk";

export interface CompleteTrack extends Track {
  genres: string[],
  releaseYear: string
}