import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, newCart } = await req.json();

  try {
    await connectDB();

    // Find the user by their email
    let user = await User.findById(userId);

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
