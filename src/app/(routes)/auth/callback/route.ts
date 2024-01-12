import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')

  const clientId = process.env.SPOTIFY_CLIENT_ID as string;
  const secret = process.env.SPOTIFY_SECRET as string;

  if (code) {
    console.log(code)
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + secret).toString("base64"),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: `${requestUrl.origin}/auth/callback`,
        grant_type: 'authorization_code'
      }), // body data type must match "Content-Type" header
    })

    const { access_token } = await response.json()
    cookies().set("token", access_token);

  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}