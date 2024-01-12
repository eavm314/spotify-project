import { api } from "./spotifyClient"

export const getUser = async () => {
  try {
    return await api.currentUser.profile();
  } catch {
    return undefined;
  }
}