"use server"
import { randomInt } from "crypto";
import { api } from "./spotifyClient"
import { getUser } from "./userInfo"

export const createPlaylist = async (name: string, description: string, initSongs: string[]) => {
  console.log(name, description, initSongs);

  const user = await getUser();
  if (!user) return undefined;

  const playlist = await api.playlists.createPlaylist(user.id, {
    name,
    description,
    public: false
  })

  const lim = 100;
  for (let rg = 0; rg < (initSongs.length - 1) / lim; rg++) {
    console.log(initSongs.slice(lim*rg, lim*(rg+1)))
    await api.playlists.addItemsToPlaylist(playlist.id, initSongs.slice(lim*rg, lim*(rg+1)));
  }
}

export const createRandomPlaylist = async (songUris: string[]) => {
  console.log(songUris)
  const user = await getUser();
  if (!user) return undefined;
  await createPlaylist(user.display_name + '_' + randomInt(100000, 999999), "Random generated Playlist", songUris);
}