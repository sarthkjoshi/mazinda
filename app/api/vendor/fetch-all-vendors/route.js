import Vendor from "@/models/Vendor";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectDB();
    // console.log("here"+connectCityDB);

    let vendors = await Vendor.find().select("-password");
    return NextResponse.json({ success: true, vendors });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while fetching vendors." + error,
    });
  }
}
