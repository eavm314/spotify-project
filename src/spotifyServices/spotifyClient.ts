import { MixAuthStrategy } from "@/extensions/MixAuthStrategy";
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { cookies } from "next/headers";

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const secret = process.env.SPOTIFY_SECRET as string;

var apiCalls = 0;

export const api = new SpotifyApi(new MixAuthStrategy(clientId, secret), {
  afterRequest: async (url, options, response) => {
    // console.log(await response.json())
    apiCalls++;
    console.log(apiCalls);
    console.log(response.status)
  }
});