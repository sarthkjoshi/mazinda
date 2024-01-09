import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email } = await req.json();
    const user = await User.findOne({ name, email });
    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
        "this is jwt secret"
      );
      return NextResponse.json({
        success: true,
        message: "User logged in successfully",
        token,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "User doesn't exists",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while continuing with google: " + error,
    });
  }
}
