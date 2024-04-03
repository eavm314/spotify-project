import { NextResponse } from "next/server"
import { encode } from "querystring";

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);

  const redirect_uri = `${requestUrl.origin}/auth/callback`;
  const scope = [
    "user-read-private", 
    "user-read-email",
    "user-library-read",
    "playlist-modify-public",
    "playlist-modify-private"
  ];

  return NextResponse.redirect('https://accounts.spotify.com/authorize?' +
    encode({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID as string,
      scope: scope.join(" "),
      redirect_uri: redirect_uri,
    }))
}