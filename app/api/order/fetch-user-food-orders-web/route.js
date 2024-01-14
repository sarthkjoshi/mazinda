import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import FoodOrder from "@/models/FoodOrder";
import jwt from 'jsonwebtoken';
export async function POST(req) {
  try {
    const { userToken, filter } = await req.json();

    const userData = jwt.verify(userToken, 'this is jwt secret');

    await connectDB();

    let user = await User.findOne({ email: userData.email })
    // let user = await User.findOne({ _id: "6589ccaff72caa2ade345cc5" })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User doesn't exists",
      });
    }

    let foodOrders = await FoodOrder.find({ userId: user._id });

    return NextResponse.json({
      success: true,
      message: "Food orders fetched successfully",
      foodOrders,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while fetching the food orders : " + error,
    });
  }
}
