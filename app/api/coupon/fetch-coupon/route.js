import Coupon from "@/models/Coupon";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { code } = await req.json();
  try {
    await connectDB();
    let coupon = await Coupon.findOne({ code });

    return NextResponse.json({
      success: true,
      message: "Coupon fetched successfully",
      coupon,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while creating the Coupon : " + error,
    });
  }
}
