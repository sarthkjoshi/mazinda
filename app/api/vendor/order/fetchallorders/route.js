import Order from "@/models/Order";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { page, perPage } = await req.json();
  try {
    // Connecting to database
    await connectDB();
    // const orders = await Order.find()
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return NextResponse.json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error:
        "orderFetch: An error occurred while fetching the orders : " + error,
    });
  }
}
