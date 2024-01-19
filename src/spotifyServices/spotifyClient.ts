import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { cookies } from "next/headers";

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const secret = process.env.SPOTIFY_SECRET as string;


const getToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + secret).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials'
    }),
    next: { revalidate: 3600 }
  });

  const token = await response.json();
  return token as AccessToken;
}

var apiCalls = 0;

const createClient = async () => {
  const token = await getToken();
  return SpotifyApi.withAccessToken(
    clientId,
    token,
    {
      beforeRequest: async (url, options) => {
        apiCalls++;
        console.log("Api Calls: ", apiCalls);
        console.log(url)
        console.log(options.headers)

        const token = cookies().get("token");
        if (token) {
          console.log("hay token de usuario");
          options.headers = {
            "Authorization": "Bearer " + token.value,
            'Content-Type': 'application/json'
          }
        }
      },

      afterRequest: async (url, options, response) => {
        // console.log(await response.json())
        console.log(response.status)
      }
    }
  );
}

// @ts-ignore
export const api = await createClient();