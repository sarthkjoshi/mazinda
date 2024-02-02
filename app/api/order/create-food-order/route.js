import FoodOrder from "@/models/FoodOrder";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      userId,
      vendorId,
      products,
      address,
      amount,
      vendorOTP,
      userOTP,
      externalDeliveryRequired,
      cutleryRequirement,
      paymentInfo,
      paymentMethod,
    } = await req.json();
    await connectDB();
    const foodOrder = await FoodOrder.create({
      userId,
      vendorId,
      products,
      address,
      amount,
      vendorOTP,
      userOTP,
      externalDeliveryRequired,
      cutleryRequirement,
      paymentInfo,
      paymentMethod,
    });
    return NextResponse.json({
      success: true,
      message: "Food order created successfully",
      order: foodOrder,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while creating the order : " + error,
    });
  }
}
