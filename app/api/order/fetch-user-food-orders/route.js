import User from "@/models/User";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import FoodOrder from "@/models/FoodOrder";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    await connectDB();

    let user = await User.findById(userId);

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
