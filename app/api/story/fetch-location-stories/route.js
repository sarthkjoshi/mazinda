import Story from "@/models/Story";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { city } = await req.json();
  try {
    // Connecting to database
    await connectDB();

    let stories = await Story.find({
      "storeDetails.city": city,
    });

    return NextResponse.json({
      success: true,
      message: "Stories fetched successfully",
      stories,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while fetching the story: " + error,
    });
  }
}
