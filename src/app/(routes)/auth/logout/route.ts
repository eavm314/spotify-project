import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);

  cookies().delete("token");
  return NextResponse.redirect(requestUrl.origin);
}