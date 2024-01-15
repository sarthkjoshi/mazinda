import Order from "@/models/Order";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { orderId, status } = await req.json();
    // Connecting to database
    await connectDB();

    // Checking if the user already exists
    let order = await Order.findOne({ _id: orderId });

    if (order) {
      order.status = status;
      await order.save();
      return NextResponse.json({
        success: true,
        message: "Order updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Order doesn't exist",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while updating the order status: " + error,
    });
  }
}
