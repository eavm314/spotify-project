import { getSavedSongs, getTestSongs } from "@/spotifyServices/mainServices";
import { Song } from "./Song";

export const SongList = async () => {
  const saved = await getSavedSongs();

  //Datos de prueba
  // const saved = await getTestSongs();
  return (
    <div className="w-1/2">
      {saved.map((tr) =>
        <Song simpleTrack={tr} />
      )}
    </div>
  )
}