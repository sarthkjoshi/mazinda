import Order from "@/models/Order";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { orderId } = await req.json();
        await connectDB()
        await Order.findByIdAndDelete(orderId)
        return NextResponse.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while deleting the order : " + error });
    }
}