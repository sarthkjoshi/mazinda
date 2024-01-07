import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { userToken, newCart } = await req.json();

  // Verify the user's token to get their email
  const userData = jwt.verify(userToken, "this is jwt secret");

  try {
    await connectDB();

    // Find the user by their email
    let user = await User.findOne({ email: userData.email });

    if (user) {
      user.cart = newCart;
      await user.save();
      return NextResponse.json({
        success: true,
        message: "Cart updated successfully",
      });
    } else {
      return NextResponse.json({ success: false, error: "User doesn't exist" });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while clearing the cart: " + err,
    });
  }
}
