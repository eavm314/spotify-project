// import { api } from "./spotifyClient"

import { createClient } from "./spotifyClient";

export const getUser = async () => {
  const api = await createClient();
  try {
    return await api.currentUser.profile();
  } catch {
    return undefined;
  }
}