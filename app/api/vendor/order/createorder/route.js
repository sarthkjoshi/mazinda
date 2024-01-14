import Order from "@/models/Order";
import connectDB from "@/lib/foodmongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId, userName, vendorId, products, address, amount, externalDeliveryRequired, cutleryRequirement, paymentInfo, paymentMethod, paymentLink } = await req.json();
        await connectDB()
        const order = await Order.create({ userId, userName, vendorId, products, address, amount, externalDeliveryRequired, cutleryRequirement, paymentInfo, paymentMethod, paymentLink });
        return NextResponse.json({ success: true, message: "Order created successfully", order: order });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while creating the order : " + error });
    }
}