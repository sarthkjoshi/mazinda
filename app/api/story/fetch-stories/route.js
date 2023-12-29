import Story from "@/models/Story";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // const { storeId } = await req.json();

    // Connecting to database
    await connectDB();

    // Checking if the Vendor already exists
    let stories = await Story.find();

    return NextResponse.json({
      success: true,
      message: "Stories fetched successfully",
      stories,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while fetching the store : " + error,
    });
  }
}
