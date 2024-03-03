import Banner from "@/models/Banner";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { banner_type } = await req.json();

  try {
    await connectDB();

    const banners = await Banner.find({ banner_type });

    return NextResponse.json({
      success: true,
      message: "Banners fetched successfully",
      banners,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while fetching the banners",
      error,
    });
  }
}
