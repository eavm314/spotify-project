import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { cookies } from "next/headers";

export const api = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID as string,
  process.env.SPOTIFY_SECRET as string,
  [],
  {
    beforeRequest: async (url, options) => {
      const token = cookies().get("token");

      if (token) {
        console.log("hay token");
        options.headers = {
          "Authorization": "Bearer " + token.value,
          'Content-Type': 'application/json'
        }
      }
    },
  }
);