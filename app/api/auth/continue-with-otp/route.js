import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { phoneNumber } = await req.json();

    // Connecting to the database
    await connectDB();

    // Checking if the user already exists with either email or phone number
    const user = await User.findOne({ phoneNumber });

    if (user) {
      const token = jwt.sign(
        { userId: user._id, phoneNumber },
        "this is jwt secret"
      );
      return NextResponse.json({
        success: true,
        message: "Logged in successfully",
        user_token: token,
        user,
      });
    } else {
      const newUser = await User.create({ phoneNumber });

      const token = jwt.sign(
        { userId: newUser._id, phoneNumber },
        "this is jwt secret"
      );
      return NextResponse.json({
        success: true,
        message: "User created successfully",
        user_token: token,
        user: newUser,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while logging in the user: " + error,
    });
  }
}
