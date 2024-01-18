import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ success: true, app_version: 1 });
}
