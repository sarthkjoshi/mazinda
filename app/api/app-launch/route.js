import { NextResponse } from "next/server";

export async function GET(req) {
  const userAgent = req.headers["user-agent"];
  let targetUrl;

  if (userAgent.includes("Android")) {
    targetUrl =
      "https://play.google.com/store/apps/details?id=com.abhey_gupta.MazindaApp";
  } else if (userAgent.includes("iPhone")) {
    targetUrl =
      "https://apps.apple.com/in/app/mazinda-ab-maze-mein-india/id6477349293";
  } else {
    targetUrl = "https://mazinda.com";
  }

  return NextResponse.redirect(targetUrl);
}
