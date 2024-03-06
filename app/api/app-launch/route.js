import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(req) {
  const headersList = headers();
  const userAgent = headersList.get("user-agent");

  console.log(userAgent);

  let targetUrl;

  if (userAgent.includes("iPhone")) {
    targetUrl =
      "https://apps.apple.com/in/app/mazinda-ab-maze-mein-india/id6477349293";
  } else {
    targetUrl =
      "https://play.google.com/store/apps/details?id=com.abhey_gupta.MazindaApp";
  }

  return NextResponse.redirect(targetUrl);
}
