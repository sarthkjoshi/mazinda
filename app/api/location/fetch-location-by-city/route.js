import Location from "@/models/Location";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  let { city } = await req.json();

  if (city === "Kamand") {
    city = "Mandi";
  }

  try {
    await connectDB();
    let location = await Location.findOne({ city });
    return NextResponse.json({ success: true, location });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while fetching the Locations : " + error,
    });
  }
}
