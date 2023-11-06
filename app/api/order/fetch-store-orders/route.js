import Store from "@/models/Store";
import connectDB from "@/libs/mongoose";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import Order from "@/models/Order";

export async function POST(req) {
    try {
        const { storeToken } = await req.json();

        const storeData = jwt.verify(storeToken, 'this is jwt secret');

        console.log(storeData);

        await connectDB()

        let store = await Store.findOne({ mobileNumber: storeData.mobileNumber })
        if (!store) {
            return NextResponse.json({ success: false, error: "store doesn't exists" });
        }
        let currentOrders = await Order.find({ storeId: store._id })
        console.log(currentOrders);
        return NextResponse.json({ success: true, message: "Current orders fetched successfully", currentOrders });
    } catch (error) {
        return NextResponse.json({ success: false, error: "An error occurred while fetching the products : " + error });
    }
}