import { AccessToken } from '@spotify/web-api-ts-sdk';
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');

  const clientId = process.env.SPOTIFY_CLIENT_ID as string;
  const secret = process.env.SPOTIFY_SECRET as string;

  if (code) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + secret).toString("base64"),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: `${requestUrl.origin}/auth/callback`,
        grant_type: 'authorization_code'
      }),
    });

    const { access_token, expires_in } = await response.json() as AccessToken;

    cookies().set("token", access_token, {
        httpOnly: true,
        expires: Date.now() + expires_in * 1000
      });
  }

  return NextResponse.redirect(requestUrl.origin);
}