import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { itemInfo, userToken } = await req.json();

  // Verify the user's token to get their email
  const userData = jwt.verify(userToken, "this is jwt secret");

  try {
    await connectDB();

    // Find the user by their email
    let user = await User.findOne({ phoneNumber: userData.phoneNumber });

    if (user) {
      user.cart = [
        {
          _id: itemInfo._id,
          quantity: 1,
        },
      ];

      // Save the updated user data
      await user.save();

      return NextResponse.json({
        success: true,
        message: "Item added successfully",
      });
    } else {
      return NextResponse.json({ success: false, error: "User doesn't exist" });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while updating the cart: " + err,
    });
  }
}
